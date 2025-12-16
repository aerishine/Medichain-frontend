// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Medichain
 * @dev Supply Chain Management for Medicines using Blockchain
 *      Stores all data on-chain to avoid backend requirements.
 */
contract Medichain is Ownable, ReentrancyGuard {
    // --- Enums & Structs ---

    enum BatchStatus {
        Manufactured,
        InTransit,
        ReceivedAtDistributor,
        AtPharmacy,
        Dispensed
    }

    struct TrackingEvent {
        BatchStatus status;
        string title;
        string description;
        string location;
        uint256 timestamp;
        address handler; // Address of actor who triggered this event
    }

    struct Medicine {
        string name;
        string sku;
        string category; // e.g. Antibiotic, Analgesic
        string dosage;   // e.g. 500mg
        string manufacturerName;
        string activeIngredients;
        bool exists;
    }

    struct Batch {
        string batchId;
        string medicineSku;
        uint256 quantity;
        uint256 mfgDate;
        uint256 expiryDate;
        address currentOwner;
        BatchStatus status;
        bool exists;
    }

    // --- State Variables ---

    // Medicine Registry
    mapping(string => Medicine) public medicines; // SKU -> Medicine
    string[] public allMedicineSkus; // Iterable list of all Medicine SKUs

    // Batch Tracking
    mapping(string => Batch) public batches; // BatchID -> Batch
    mapping(string => TrackingEvent[]) public batchHistory; // BatchID -> History Logs
    
    // Inventory Management (No-Backend Support)
    // Maps an address to a list of BatchIDs they currently own
    mapping(address => string[]) public ownerInventory; 
    // Helper to track index of a batch in the ownerInventory array for O(1) removal
    mapping(address => mapping(string => uint256)) private _ownerInventoryIndex;

    // Roles (Simple mapping for MVP, can be expanded to AccessControl)
    mapping(address => bool) public authorizedManufacturers;
    mapping(address => bool) public authorizedDoctors;
    mapping(address => bool) public authorizedPharmacies;

    // --- Events ---

    event MedicineRegistered(string indexed sku, string name, string manufacturer);
    event BatchCreated(string indexed batchId, string indexed sku, address indexed owner, uint256 quantity);
    event BatchTransferred(string indexed batchId, address indexed from, address indexed to, BatchStatus newStatus);
    event StatusUpdated(string indexed batchId, BatchStatus status, string location);

    // --- Modifiers ---

    modifier onlyManufacturer() {
        require(authorizedManufacturers[msg.sender] || owner() == msg.sender, "Caller is not a manufacturer");
        _;
    }

    // --- Constructor ---
    
    constructor(address initialOwner) Ownable(initialOwner) {
        // Owner is automatically a super-admin, can assign roles
    }

    // --- Role Management ---

    function setManufacturer(address _addr, bool _status) external onlyOwner {
        authorizedManufacturers[_addr] = _status;
    }

    function setDoctor(address _addr, bool _status) external onlyOwner {
        authorizedDoctors[_addr] = _status;
    }

    function setPharmacy(address _addr, bool _status) external onlyOwner {
        authorizedPharmacies[_addr] = _status;
    }

    // --- Core Logic: Medicine Registry ---

    function registerMedicine(
        string memory _name,
        string memory _sku,
        string memory _category,
        string memory _dosage,
        string memory _manufacturerName,
        string memory _activeIngredients
    ) external onlyManufacturer {
        require(!medicines[_sku].exists, "Medicine SKU already exists");

        Medicine memory newMed = Medicine({
            name: _name,
            sku: _sku,
            category: _category,
            dosage: _dosage,
            manufacturerName: _manufacturerName,
            activeIngredients: _activeIngredients,
            exists: true
        });

        medicines[_sku] = newMed;
        allMedicineSkus.push(_sku);

        emit MedicineRegistered(_sku, _name, _manufacturerName);
    }

    // --- Core Logic: Batch Manufacturing ---

    function createBatch(
        string memory _batchId,
        string memory _medicineSku,
        uint256 _quantity,
        uint256 _expiryDate,
        string memory _location
    ) external onlyManufacturer { // In production, require msg.sender to be the specific manufacturer of the medicine
        require(medicines[_medicineSku].exists, "Medicine SKU does not exist");
        require(!batches[_batchId].exists, "Batch ID already exists");

        // Create Batch
        Batch memory newBatch = Batch({
            batchId: _batchId,
            medicineSku: _medicineSku,
            quantity: _quantity,
            mfgDate: block.timestamp,
            expiryDate: _expiryDate,
            currentOwner: msg.sender,
            status: BatchStatus.Manufactured,
            exists: true
        });

        batches[_batchId] = newBatch;
        
        // Add to Owner Inventory
        _addToInventory(msg.sender, _batchId);

        // Log Initial History
        _addTrackingEvent(_batchId, BatchStatus.Manufactured, "Manufacturing Complete", "Batch created and registered on blockchain.", _location);

        emit BatchCreated(_batchId, _medicineSku, msg.sender, _quantity);
    }

    // --- Core Logic: Supply Chain Transfer ---

    function transferBatch(
        string memory _batchId,
        address _to,
        string memory _location,
        string memory _transferTitle, // e.g., "Dispatched to Distributor"
        string memory _transferDescription,
        BatchStatus _newStatus
    ) external nonReentrant {
        require(batches[_batchId].exists, "Batch does not exist");
        require(batches[_batchId].currentOwner == msg.sender, "You do not own this batch");
        require(_to != address(0), "Cannot transfer to zero address");

        // Update ownership
        _removeFromInventory(msg.sender, _batchId);
        batches[_batchId].currentOwner = _to;
        batches[_batchId].status = _newStatus;
        _addToInventory(_to, _batchId);

        // Update History
        _addTrackingEvent(_batchId, _newStatus, _transferTitle, _transferDescription, _location);

        emit BatchTransferred(_batchId, msg.sender, _to, _newStatus);
    }

    // --- Helper Functions (Internal) ---

    function _addToInventory(address _owner, string memory _batchId) internal {
        ownerInventory[_owner].push(_batchId);
        _ownerInventoryIndex[_owner][_batchId] = ownerInventory[_owner].length - 1;
    }

    function _removeFromInventory(address _owner, string memory _batchId) internal {
        string[] storage inventory = ownerInventory[_owner];
        uint256 index = _ownerInventoryIndex[_owner][_batchId];
        
        require(index < inventory.length, "Inventory index out of bounds");
        require(keccak256(bytes(inventory[index])) == keccak256(bytes(_batchId)), "Inventory mismatch");

        // Move last element to the deleted spot (Swap and Pop)
        string memory lastBatchId = inventory[inventory.length - 1];
        
        inventory[index] = lastBatchId;
        _ownerInventoryIndex[_owner][lastBatchId] = index;
        
        inventory.pop();
        delete _ownerInventoryIndex[_owner][_batchId];
    }

    function _addTrackingEvent(
        string memory _batchId,
        BatchStatus _status,
        string memory _title,
        string memory _desc,
        string memory _loc
    ) internal {
        TrackingEvent memory newEvent = TrackingEvent({
            status: _status,
            title: _title,
            description: _desc,
            location: _loc,
            timestamp: block.timestamp,
            handler: msg.sender
        });
        batchHistory[_batchId].push(newEvent);
        emit StatusUpdated(_batchId, _status, _loc);
    }

    // --- View Functions (Frontend Helpers) ---

    function getAllMedicines() external view returns (Medicine[] memory) {
        Medicine[] memory allMeds = new Medicine[](allMedicineSkus.length);
        for (uint256 i = 0; i < allMedicineSkus.length; i++) {
            allMeds[i] = medicines[allMedicineSkus[i]];
        }
        return allMeds;
    }

    function getMyInventory(address _owner) external view returns (Batch[] memory) {
        string[] memory batchIds = ownerInventory[_owner];
        Batch[] memory myBatches = new Batch[](batchIds.length);
        
        for (uint256 i = 0; i < batchIds.length; i++) {
            myBatches[i] = batches[batchIds[i]];
        }
        return myBatches;
    }

    function getBatchHistory(string memory _batchId) external view returns (TrackingEvent[] memory) {
        return batchHistory[_batchId];
    }
}
