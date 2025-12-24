   if (window['SegmentifyTrackingObject']) {
       throw new Error("Segmentify is already loaded!");
   }

   (function(url, namespace, config) {
       window['SegmentifyTrackingObject'] = namespace;
       window[namespace] = window[namespace] || function() {
           (window[namespace].q = window[namespace].q || []).push(arguments);
       };
       window.sgfLayer = {};
       window[namespace].config = config || {};
       if (!document.getElementById('__segmentify_script__')) {
           var wa = document.createElement('script');
           wa.id = '__segmentify_script__';
           wa.async = 1;
           wa.src = url;
           var s = document.getElementsByTagName('script')[0];
           s.parentNode.insertBefore(wa, s);
       }
   })('/segmentify.debug.js', 'Segmentify', {
       segmentifyApiUrl: '//gandalf-dev.segmentify.com/',
       segmentifyPushUrl: '//gimli-dev.segmentify.com/',
       categoryHierarchy: true,
       currency: 'TRY'
   });

   Segmentify('apiKey', 'ae272bfb-214b-4cdd-b5c4-1dddde09e95e', true, false);

   function waitSegmentifyAndjQuery() {
       if (window["_SgmntfY_"] && window["_SgmntfY_"]._getJq()) {
           window.segJquery = window["_SgmntfY_"]._getJq();

           segJquery(document).ready(function() {
               SegmentifyIntegration(window.segJquery).init();
           });
       } else {
           setTimeout(waitSegmentifyAndjQuery, 100);
       }
   }

   var SegmentifyIntegration = function(jQuery) {
       var segmentifyEvents = {
           viewPage: function(category, subCategory, params) {
               Segmentify('view:page', {
                   'category': category,
                   'subCategory': subCategory,
                   'params': params
               });
           },
           viewProduct: function(productObj) {
               Segmentify('view:product', productObj);
           },
           checkoutBasket: function(basketObj) {
               Segmentify('checkout:basket', basketObj);
           },
           checkoutPurchase: function(purchaseObj) {
               Segmentify('checkout:purchase', purchaseObj);
           },
           basketAdd: function(basketObj) {
               Segmentify('basket:add', basketObj);
           },
           basketRemove: function(basketObj) {
               Segmentify('basket:remove', basketObj);
           },
           basketClear: function(basketObj) {
               Segmentify('basket:clear', basketObj);
           },
           userUpdate: function(userObj) {
               Segmentify('user:update', userObj);
           },
           userId: function(id) {
               Segmentify('userid', id);
           },
           custom: function(customObj) {
               Segmentify('event:custom', customObj);
           }
       };

       var helperFunctions = {
           "setCookie": function(cname, cvalue, exdays) {
               window["_SgmntfY_"]._storePersistentData(cname, cvalue, exdays, false);
           },
           "getCookie": function(cname) {
               return window["_SgmntfY_"]._getPersistentData(cname, false);
           },
           "getQueryParameter": function(pname, url) {
               return window["_SgmntfY_"]._getQueryParameter(pname, url);
           }
       };


       var pageVariables = {
           category: "",
           subCategory: ""
       };


       var findPageType = function() {
           try {
               if (jQuery("body").hasClass("template-collection")) {
                   pageVariables.category = "Category Page";
                   pageVariables.subCategory = "";
                   return;
               }

               if (jQuery("body").hasClass("template-product")) {
                   pageVariables.category = "Product Page";
                   pageVariables.subCategory = "";
                   return;
               }

               if (jQuery("body").hasClass("template-cart")) {
                   pageVariables.category = "Basket Page";
                   return;
               }

               if (jQuery("body").hasClass("template-search")) {
                   pageVariables.category = "Search Page";
                   pageVariables.subCategory = "";
                   return;
               }

               if (jQuery("body").hasClass("template-password")) {
                   pageVariables.category = "404 Page";
                   return;
               }
               if (document.location.pathname === '/pages/custom') {
                   pageVariables.category = "Custom Page";
                   return;
               }

               if (0) {
                   pageVariables.category = "Purchase Success Page";
                   return;
               }
               if (jQuery("body").hasClass("template-404")) {
                   pageVariables.category = "404 Page";
                   return;
               }


           } catch (err) {
               window.segErr = err;
           }
       };


       var triggerPageFunction = function(category) {
           try {
               if (category && pageFunctions.hasOwnProperty(category)) {
                   pageFunctions[category]();
               }

               pageFunctions["All Pages"]();
           } catch (err) {
               window.segErr = err;
           }
       };

       var init = function() {
           findPageType();
           triggerPageFunction(pageVariables.category);
       };

       var pageFunctions = {
           "All Pages": function() {
               Segmentify('view:page', {
                   'category': pageVariables.category,
                   'lang': 'EN',
                   subCategory: 'Shirt'
               })

               try {

                   var register = helperFunctions.getQueryParameter("_user_register")
                   var update = helperFunctions.getQueryParameter("_user_update")
                   var login = helperFunctions.getQueryParameter("_user_login")
                   var logout = helperFunctions.getQueryParameter("_user_logout")



                   users = []

                   if (register != "") {
                       Segmentify('user:signup', {
                           "email": users[parseInt(register)].email,
                           "username": users[parseInt(register)].username,
                           "fullName": users[parseInt(register)].fullName
                       })



                   }



                   if (update != "") {

                       Segmentify('user:update', {
                           "email": users[parseInt(update)].email,
                           "username": users[parseInt(update)].username,
                           "fullName": users[parseInt(update)].fullName,
                           "birthDate": users[parseInt(update)].birthDate
                       })
                   }


                   if (login != "") {

                       Segmentify('user:signin', {
                           "email": users[parseInt(signin)].email,
                           "username": users[parseInt(signin)].username,
                           "fullName": users[parseInt(signin)].fullName
                       })
                   }


                   if (logout != "") {

                       Segmentify('user:signout', {
                           "email": users[parseInt(logout)].email,
                           "username": users[parseInt(logout)].username,
                           "fullName": users[parseInt(logout)].fullName
                       })
                   }


               } catch (e) {
                   window.error = e


               }
           },

           "Home Page": function() {


               try {
                   var bannerify = BannerifyIntegration(jQuery);
                   var bannerContainer = jQuery("#shopify-section-slideshow").first();;
                   var bannerItems = bannerContainer.find(".slick-slide");
                   var bannerifies = {
                       "group": "Anasayfa Slider",
                       "banners": []
                   };

                   jQuery.each(bannerItems, function(index, item) {

                       var currentItem = jQuery(this);
                       var bannerAnchor = currentItem.find(".slideshow__title");
                       var bannerLink = currentItem.find(".slideshow__link");
                       var bannerImage = currentItem.find(".slideshow__image").attr("data-bgset").split(",")[5].trim().split(" ");

                       var myself = {
                           "title": bannerAnchor.text().trim() + (index + 1) || "",
                           "order": (index + 1),
                           "image": "http:" + bannerImage[0],
                           "urls": [bannerLink.attr("href")]
                       };

                       var params = {
                           "banner": currentItem,
                           "bannerAnchor": bannerLink,
                           "bannerGroup": bannerifies.group,
                           "bannerOrder": myself.order,
                           "bannerUrl": myself.urls[0] || "",
                           "bannerTitle": myself.title
                       };

                       bannerifies.banners.push(myself);



                       bannerify.executer(params, function() {
                           var currentSlider = jQuery(currentItem);

                           if (currentSlider.hasClass("slick-active")) {
                               return true;
                           }

                           return false;

                       });

                   });




                   if (bannerifies.banners.length > 0) {
                       bannerify.groupView(bannerifies);
                   }
               } catch (e) {
                   window.err = e
               }




           },


           "Product Page": function() {

               jQuery("#AddToCartText-product-template").on("click", function() {
                   Segmentify('basket:add', {
                       productId: window.product.id,
                       quantity: 1,
                   });
               })
                   var price = jQuery("#ProductPrice-product-template").text()
                   var productObj = {};
                   productObj["brand"] = window.product.vendor;
                   productObj["title"] = window.product.title;
                   productObj["productId"] = window.product.id;
                   productObj["image"] = window.product.featured_image;
                   //productObj["oldPrice"] = parseFloat(price.trim().replace("$", "").replace(",", "")) + 1 ;
                   productObj["price"] = parseFloat(price.trim().replace("$", "").replace(",", ""));
                   productObj["inStock"] = window.product.available;
                   productObj["productUrl"] = document.location.href;
                   productObj["url"] = document.location.href;
                   productObj["lang"] = "EN";
                   productObj["currency"] = "USD";
                   //productObj["stockStatus"] = 60
                   productObj["category"] = window.product.type;
                   productObj["params"] = {
                       "new_params": "tr"
                   }
                   segmentifyEvents.viewProduct(productObj);
           },
           "Basket Page": function() {
               var basketAmount = "";
               if (jQuery(".cart__subtotal").length > 0) {
                   basketAmount = jQuery(".cart__subtotal")[0].innerText.replace("TL", "").replace("$", "").replace(",", "")
               }
               var basketProducts = [];
               if (window.productList != undefined) {
                   for (i = 0; i < window.productList.length; i++) {
                       basketProducts.push({
                           "productId": window.productList[i].product_id.toString(),
                           "quantity": window.productList[i].quantity,
                           "productPrice": jQuery("td.text-right.small--hide")[i].innerText.replace("TL", "").replace("TL", "").replace("$", "").replace(",", "").trim()
                       });
                   }
               }
               var basketInfo = {
                   "totalPrice": basketAmount,
                   "productList": basketProducts
               };


               segmentifyEvents.checkoutBasket(basketInfo);



           },
           "Purchase Success Page": function() {
               var purchase = Shopify.checkout || "";

               if (purchase) {
                   var purchaseAmount = purchase["total_price"] || "";
                   var purchaseProducts = [];
                   var orderNo = purchase["order_id"] || "";

                   for (var i = 0; i < purchase["line_items"].length; i++) {
                       var item = purchase["line_items"][i];

                       purchaseProducts.push({
                           "productId": item["product_id"],
                           "quantity": item["quantity"] || "1",
                           "price": item["price"] || ""
                       });
                   }

                   // Put basket event information into a variable
                   var purchaseInfo = {
                       "orderNo": orderNo,
                       "totalPrice": purchaseAmount,
                       "productList": purchaseProducts
                   };

                   // Send checkout basket event
                   segmentifyEvents.checkoutPurchase(purchaseInfo);
               }
           }
       };

       return {
           init: init
       };
   };
   waitSegmentifyAndjQuery();