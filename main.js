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
var rejexTitleMessage = document.getElementById('rejexTitleMessage');
var rejexPriceMessage = document.getElementById('rejexPriceMessage');
var errorMessage = document.getElementById('errorMessage');


titleInput.onkeyup=function(){
    var titleRejex=/^[A-Z][a-z]{2,10}\s?$/;
    console.log(titleRejex.test(titleInput.value));
    if(titleRejex.test(titleInput.value))
    {
        titleInput.classList.add('is-valid')
        titleInput.classList.remove('is-invalid')
        rejexTitleMessage.classList.add('d-none')

    }else{
        titleInput.classList.add('is-invalid')
        titleInput.classList.remove('is-valid')
        rejexTitleMessage.classList.remove('d-none')
    }

}

priceInput.onkeyup = function (){
    var priceRejex = /^[0-9]{1,5}$/;

    if (priceRejex.test(priceInput.value)) {
        priceInput.classList.add('is-valid');
        priceInput.classList.remove('is-invalid');
        rejexPriceMessage.classList.replace('d-block','d-none')


    
    } else {
        priceInput.classList.add('is-invalid');
        priceInput.classList.remove('is-valid');
        rejexPriceMessage.classList.replace('d-none','d-block')

    
    }
    
}



function localStorageSet() {
    localStorage.setItem('productList',JSON.stringify(products));
  
  }


  if(localStrageGet !==null){
  
    products = localStrageGet ;
    displayData()

  
}


addBtn.onclick = function (){
    if(titleInput.value != '' 
    && priceInput.value !='' 
    && taxesInput.value != '' 
    && adsInput.value != ''
   && discountInput.value != '' 
   && categoryInput.value != ''
   && products.count < 100 )
    {
        errorMessage.classList.replace('d-block','d-none')
        titleInput.classList.add('is-valid')
        titleInput.classList.remove('is-invalid')
        priceInput.classList.add('is-valid')
        priceInput.classList.remove('is-invalid')
        taxesInput.classList.add('is-valid')
        taxesInput.classList.remove('is-invalid')
        adsInput.classList.add('is-valid')
        adsInput.classList.remove('is-invalid')
        discountInput.classList.add('is-valid')
        discountInput.classList.remove('is-invalid')
        categoryInput.classList.add('is-valid')
        categoryInput.classList.remove('is-invalid')


        if(addBtn.innerHTML == 'Add'){
            addProduct()
          }
           else{
         updateProduct()
          }
          clearData()

    }else{
        errorMessage.classList.replace('d-none','d-block')
        titleInput.classList.remove('is-valid')
         titleInput.classList.add('is-invalid')
        priceInput.classList.remove('is-valid')
         priceInput.classList.add('is-invalid')
        taxesInput.classList.remove('is-valid')
         taxesInput.classList.add('is-invalid')
        adsInput.classList.remove('is-valid')
         adsInput.classList.add('is-invalid')
        discountInput.classList.remove('is-valid')
         discountInput.classList.add('is-invalid')
        categoryInput.classList.remove('is-valid')
         categoryInput.classList.add('is-invalid')

    }

      displayData()
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




// let array1 = ['hazem',8633,'mohamed','samer',2,5,88,33,55,'abdalahh',56 , 'sayed']
// let array2 = ['red','blue','green']

// for (let i = 0; i < array1.length; i++) {

//     if (typeof array1[i] ==='number' ) {
//         continue;
//     }
//     console.log(array1[i]); 

// }


// let a = 15;
// let b = 30;
// setTimeout(() => {
// console.log(a, b);
// }, 0);
// [b, a] = [a, b];
// console.log(a, b);