# Sample Microservices

An example project to learn about microservices

### TODO:

- [ ] Add authentication
  - [ ] Authenticate the `create order` api
  - [ ] Authenticate the `order_created` event
- [ ] Create a service to make delivery
  - [ ] The delivery service listens for `order_created` event and then sends a notification to the customer.
  - [ ] Order service will also listen for `delivery_made` event and it will update the order_status of the order to `delivered` when it occurs.
