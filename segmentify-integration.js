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

               if (jQuery("body").hasClass("purchase-success-page")) {
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

           "Home Page": function() {},
           "Product Page": function() {},
           "Basket Page": function() {

           },
           "Purchase Success Page": function() {}
       };

       return {
           init: init
       };
   };
   waitSegmentifyAndjQuery();