
$("document").ready(() => {
    loadSubCategories();
    $('#uploadService').on('submit', function(e){
        e.preventDefault();
        uploadService();
	})
});


var loadSubCategories=()=>{
	var url="http://172.105.167.182:8081/catalog/subCategories";
	
	fetch(url)
	.then(res=>res.json())
	.then(data=>{
		let html="";
		data.forEach((subCategory)=>{
			html+=`<option>${subCategory.subCategoryName}</option>`
		})
		document.getElementById("pSubCategory").innerHTML=html;
		
		}).catch(err=>{
		console.log(err)
	})
	
}

var uploadService=()=>{ 
	let url = "http://172.105.167.182:8081/services/providers/services"
	var serviceName = $("input[name='serviceName']").val();
	var serviceDescription = $("input[name='serviceDescription']").val();
	var serviceVerification = $("input[name='serviceVerification']").val();
	var serviceType = $("input[name='serviceType']").val();
	var subCategory = $("input[name='subCategory']").val();
	var serviceCharge = $("input[name='serviceCharge']").val();
	fetch(url,{
		method:'post',
		headers: {
           	'Content-Type': 'application/json'
		},
		body:JSON.stringify({serviceType:serviceType,serviceName:serviceName,
			serviceCharge: serviceCharge, subCategory: subCategory,
			serviceVerification: serviceVerification, serviceDescription: serviceDescription
		})
	})
	.then(res=>{
		if (res.ok) {
          
			window.location.href="add_products.html"
			}else{
			throw new Error('upload error');
		}
	})
	
	.catch((error) => {
		window.sessionStorage.clear();
		swal.fire({
			text:'Could not upload new product',
			icon: "error",
			buttonsStyling: false,
			confirmButtonText: "Retry",
			customClass: {
				confirmButton: "btn font-weight-bold btn-light-primary"
			}
		})
	});
	
}


