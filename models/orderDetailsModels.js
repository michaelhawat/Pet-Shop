
class OrderDetails{
    constructor(odId,orderId, productId, quantity){
        this.odId = odId;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }
    static fromRow(row){
        return new OrderDetails(
            row.orderdetails_id,
            row.order_id,
            row.product_id,
            row.quantity
        )
    }
}
module.exports= OrderDetails;