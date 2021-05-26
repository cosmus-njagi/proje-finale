"use strict";
// Class Definition
var KTLogin = function () {
    var _login;
    var _handleSignInForm = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        
        $('#kt_login_signin_submit').on('click', function (e) {
            e.preventDefault();
            console.log("your button has been clicked");
            validation.validate().then(function (status) {
                if (status == 'Valid') {
                   var name=document.getElementByName("productName").value();
                    var name=document.getElementByName("productVariant").value();
                    var description=document.getElementByName("productQuantity").value();
                    var quantity=document.getElementByName("productQuantity").value();
                    let subCategory =document.getElementById("pSubCategory").options[e.selectedIndex].text;
                    //let category =document.getElementById("pCategory").options[e.selectedIndex].text;
                    let price =document.getElementsByName("productPrice").value();
                    let phone=document.getElementsByName("providerPhone").value();

                    var body=JSON.stringify({productQuantity:quantity,productName:name,
                    productPrice:price,productDescription:description,photos:imageUris,subCategory:subCategory, productProvider:phone,productVariant:productVariant});
                    var url = "http://172.105.167.182:8081/login";
                    console.log(`${phone} ${password}`)
                    fetch(url, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ phone: phone, password: password })
                    })
                        .then(res => {
                            if (res.ok) {
                                window.sessionStorage.setItem("token", res.headers.get('Authorization'))
                                window.location.href = "dashboard.html"
                            } else {
                                throw new Error('Login error');
                            }
                        })
					
                        .catch((error) => {
                            window.sessionStorage.clear();
                            swal.fire({
                                text: 'Invalid Login credentials',
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Retry",
                                customClass: {
                                    confirmButton: "btn font-weight-bold btn-light-primary"
                                }
                            })
                        });
                } else {
                    swal.fire({
                        text: "Sorry, looks like there are some errors detected, Check if fields are empty.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light-primary"
                        }
                    }).then(function () {
                        KTUtil.scrollTop();
                    });
                }
            });
			
        });
        // Public Functions
        return {
            // public functions
            init: function () {
                _login = $('#kt_login');
                _handleSignInForm();
                _handleSignUpForm();
                _handleForgotForm();
            }
        };
    }();
}
// Class Initialization
jQuery(document).ready(function() {
    KTLogin.init();
});
