
pragma solidity ^0.4.5;

interface WarehouseI {
    function setDeliveryAddress(string where) external;
    function ship(uint id, address customer) external returns (bool handled);
}

contract Store {
    address wallet;
    WarehouseI warehouse;

    constructor(address _wallet, address _warehouse) public {
        wallet = _wallet;
        warehouse = WarehouseI(_warehouse);
    }

    function purchase(uint id) payable public returns (bool success) {
        wallet.transfer(msg.value);
        return warehouse.ship(id, msg.sender);
    }
}