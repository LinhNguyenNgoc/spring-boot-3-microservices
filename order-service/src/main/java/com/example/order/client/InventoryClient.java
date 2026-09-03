package com.example.order.client;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;

//@FeignClient(value = "inventory", url = "${inventory.url}")
//public interface InventoryClient {
//
//    @RequestMapping(method = RequestMethod.GET, value = "/api/inventory")
//    boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity);
//}

public interface InventoryClient {

    @GetExchange("/api/inventory")
    boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity);
}