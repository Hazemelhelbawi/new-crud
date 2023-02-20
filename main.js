var titleInput = document.getElementById('titleInput');
var priceInput = document.getElementById('priceInput');
var taxesInput = document.getElementById('taxesInput');
var adsInput = document.getElementById('adsInput');
var discountInput = document.getElementById('discountInput');
var totalPrice = document.getElementById('totalPrice');
var countInput = document.getElementById('countInput');
var categoryInput = document.getElementById('categoryInput');
var descInput = document.getElementById('descInput');
var searchInput = document.getElementById('searchInput');
let addBtn = document.getElementById('addBtn')
let inputForm = document.getElementsByClassName('formcontrol')
var products=[];
var localStrageGet =JSON.parse(localStorage.getItem('productList'));
var deleteAll = document.getElementById('deleteAll');
var currentIndex ; // global varriable for using as global from more than function ( to take index from getProduct function to updateFunction)



function localStorageSet() {
    localStorage.setItem('productList',JSON.stringify(products));
  
  }


  if(localStrageGet !==null){
  
    products = localStrageGet ;
    displayData()

  
}


addBtn.onclick = function (){
    if(addBtn.innerHTML == 'Add'){
        addProduct()
      }
       else{
     updateProduct()
      }
      displayData()
      clearData()
      getTotalPrice()

      }




function getTotalPrice() {
    if(priceInput.value !== '')
    {
        let result = (+priceInput.value + +taxesInput.value + +adsInput.value) - +discountInput.value ;
        totalPrice.innerHTML = result ;
        totalPrice.style.background = "#0A0";
    }
    else{
        totalPrice.innerHTML = '';
        totalPrice.style.background = "#ae1f0f";

    }
}



function addProduct(){
    var product ={
        title : titleInput.value ,
        price : priceInput.value ,
        taxes : taxesInput.value , 
        ads : adsInput.value , 
        discount : discountInput.value ,
        totalPrice : totalPrice.innerHTML ,
        count : countInput.value , 
        category : categoryInput.value ,
        desc : descInput.value ,
    }
    if(product.count > 1){
        for (let i = 0; i < product.count; i++) {
            products.push(product);

            
        }
    }else{
        products.push(product);

    }
    localStorageSet()
        console.log(products);

}


function displayData(){
 
    var cartona='';
    for (let i = 0; i < products.length; i++) {
        cartona +=`<tr>
                    <td>${i+1}</<td>
                    <td>${products[i].title}</<td>
                    <td>${products[i].price} LE</<td>
                    <td>${products[i].taxes} LE</<td>
                    <td>${products[i].ads} LE</<td>
                    <td>${products[i].discount} LE</<td>
                    <td>${products[i].totalPrice} LE</<td>
                    <td>${products[i].category}</<td>
                 
                 
                    <td>
                    <button onclick="getProductInfo(${i})" class="btn btn-warning btn">Update</button>
                    </td>
                    <td>
                    <button onclick="deleteProduct(${i})" class="btn btn-danger btn">Delete</button>
                    </td>
        
        </tr>`
        
    }

    getTotalPrice()

    document.getElementById('tableBody').innerHTML=cartona;
    console.log(cartona);

    if(products.length >0){
        deleteAll.innerHTML = `<button  onclick="deleteAllData()" class="btn w-75 addbtn" >Delete All (${products.length})</button>
        `
    }else{
        deleteAll.innerHTML = ''
    }
}


function clearData(){
    for (let i = 0; i < inputForm.length; i++) {
        inputForm[i].value= ''
        
    }
}

function deleteProduct(i){
    products.splice(i,1)
    displayData()
    localStorageSet()
}



// var currentIndex ;  global varriable for using as global from more than function ( to take index from getProduct function to updateFunction)



function getProductInfo(index){

    currentIndex = index ; 
    console.log(products[index]);
   var  currentProducts = products[index] ;
   titleInput.value = currentProducts.title ;
    priceInput.value  = currentProducts.price ;
    taxesInput.value  = currentProducts.taxes ; 
   adsInput.value  = currentProducts.ads ; 
   discountInput.value  = currentProducts.discount ;
   totalPrice.innerHTML  = currentProducts.totalPrice ;
    countInput.value  = currentProducts.count ; 
   categoryInput.value  = currentProducts.category ;
   descInput.value  = currentProducts.desc ;
   getTotalPrice()

   addBtn.innerHTML = 'Update' ;
    scroll({
        top:0,
        behavior:"smooth",
    })
    countInput.style.display = "none";


}


function updateProduct(){

    var product ={
        title : titleInput.value ,
        price : priceInput.value ,
        taxes : taxesInput.value , 
        ads : adsInput.value , 
        discount : discountInput.value ,
        totalPrice : totalPrice.innerHTML ,
        count : countInput.value , 
        category : categoryInput.value ,
        desc : descInput.value ,
    }
    products[currentIndex] = product
    localStorageSet()
    addBtn.innerHTML = 'Add' ;
    countInput.style.display = "block";



}


function deleteAllData(){
    localStorage.clear();
    products.splice(0)
    displayData()
}




searchInput.onkeyup = function(){
    console.log(searchInput.value);


     
    var cartona='';
    for (let i = 0; i < products.length; i++) {
        if(products[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) || products[i].category.toLowerCase().includes(searchInput.value.toLowerCase()) )
        cartona +=`<tr>
            <td>${i+1}</<td>
            <td>${products[i].title}</<td>
            <td>${products[i].price} LE</<td>
            <td>${products[i].taxes} LE</<td>
            <td>${products[i].ads} LE</<td>
            <td>${products[i].discount} LE</<td>
            <td>${products[i].totalPrice} LE</<td>
            <td>${products[i].category}</<td>
         
         
            <td>
            <button onclick="getProductInfo(${i})" class="btn btn-warning btn">Update</button>
            </td>
            <td>
            <button onclick="deleteProduct(${i})" class="btn btn-danger btn">Delete</button>
            </td>

</tr>`
        }

        
    
    document.getElementById('tableBody').innerHTML=cartona;

}