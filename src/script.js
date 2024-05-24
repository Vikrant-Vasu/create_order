        // calculate the no. of selected elements
        let totalPrice = 0;
        const totalPriceElement = document.getElementById('total-price');

   

        
        document.addEventListener('DOMContentLoaded', function () {


            


            //js for the tag
            const input = document.querySelector('#tagInput')
            const tagForm = document.querySelector('#tagForm')
            const output = document.querySelector('.tags')
            const duplicateMessage = document.querySelector('.duplicate-message');  // Duplicate message element
             const tagSet = new Set();

            //function for outputing the tags
            function outputTag(tagValue)
            {
                duplicateMessage.style.display = 'none';

                const tag = `<span class="tag">
                <b>${tagValue}</b>
                <span class="close">x</span>
                </span>`;

                //output the tag
             output.innerHTML += tag;

             tagSet.add(tagValue)

                //clear the input
             input.value = '';

            }

            tagForm.addEventListener('submit', function(e){
                e.preventDefault();
                

                const tagValue = input.value.trim();

                if(tagValue=== ""){
                    return;
                }
                else if (tagSet.has(tagValue)) {
                    // If the tag already exists, show the duplicate message
                    duplicateMessage.style.display = 'block';
                    input.value ='';
                }
                //limit the amount of tags to 5
                else if(output.children.length >= 4){
                    outputTag(tagValue);
                    input.disabled = true;
                    
                    input.placeholder = "You have reached the maximum tags";
                }
                else{
                    console.log("hello");
                    duplicateMessage.style.display = 'none';  // Hide the duplicate message
                    console.log("hello");
                    outputTag(tagValue);
                }
                    
            })

            window.addEventListener('click', function(e){
                if(e.target.classList.contains('close')){
                    const tagElement = e.target.parentElement;
                    const tagValue = tagElement.querySelector('b').textContent;
                    tagSet.delete(tagValue); //removing tag from the set
                    tagElement.remove();
                    input.disabled = false;
                    input.placeholder = "Add a tag";
                    duplicateMessage.style.display = "none";
                }
            });
            //code for the tag ends here
            



           
// Fetch the JSON file
fetch("./response.json")
    .then(response =>  response.json())
    .then(data => {
        
        console.log(data.products[0].title);

        const productArray = data.products;

        // productArray.forEach((product) => {
        //     // Accessing src of the image
        //     console.log(product?.image?.src);
        // });

        // console.log(productArray);
        let productData = "";

        productArray.forEach((value)=>{
            // console.log(value.variants.length);
           if(value.image)
            {
               

                if( value.variants.length===1)
                    {
                        productData += `<div class="flex flex-row justify-between space-x-5 p-3 border-b  items-center ">
                        <div class=" flex flex-row space-x-5 items-center justify-start"><input type="checkbox"
                                class="product-checkbox" style="height: 16px; width: 16px;">
                            <img src="${value?.image.src}"
                                alt="img1" width="45" class="border rounded-lg">
                            <p >${value.title} </p>
                        </div>
                        <div>
                            <span>₹</span><span class="price-amount">${value.variants[0].price}</span> <span>INR</span>
                            </div>
                        </div>`
                    }
                 else if( value.variants.length>1)
                    {
                        productData += `<div class="flex flex-col">
                        <div class="flex flex-row justify-start space-x-5 p-3 border-b  items-center ">
                            <input type="checkbox" style="height: 16px; width: 16px;" class=" ">
                            <img src="${value?.image.src}"
                                alt="img1" width="45" class="border rounded-lg">
                            <p class="">${value.title} </p>
                        </div>`

                        value.variants.forEach((variant)=>{
                            productData += ` <div class="flex flex-row  space-x-5 p-3 pl-14 border-b justify-between items-center ">
                            <div  class="flex flex-row  space-x-5 items-center">
                                <input type="checkbox" style="height: 16px; width: 16px;" >
                           
                            <p class="">${variant.title}</p>
                            </div>
                            <div>
                                <p>₹${variant.price} INR</p>
                            </div>
                        </div>`;
    
           
                    });
        
                    productData += `</div>`
                    }
            }
            
        });

        document.getElementById("product-data").innerHTML = productData;

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    //end of fetch


            const checkboxes = document.querySelectorAll('.product-checkbox');
            const variantCountElement = document.getElementById('variant-count');
            const totalItems = checkboxes.length;
            

            // updateSelectedCount();

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateSelectedCount);
            });

            function updateSelectedCount() {

                console.log("hello");
                let selectedCount = 0;
                totalPrice = 0;


                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        selectedCount++;
                        const priceElement = checkbox.closest('.flex-row').nextElementSibling.querySelector('.price-amount');
                        // console.log(priceElement);
                        const price = parseFloat(priceElement.textContent);
                        totalPrice += price;
                        // console.log(totalPrice);
                    }
                });

                variantCountElement.innerText = `${selectedCount}/${totalItems} variants selected`;


            }
        });

        // end of the function



        const open = document.getElementById("open");
        const search = document.getElementById("search");
        const modal_container = document.getElementById('modal_container');
        const close = document.getElementById("close");
        const canclebox = document.getElementById("canclebox");


        // for add button
        const addamount = document.getElementById('addamount');
        addamount.addEventListener('click', () => {
            totalPriceElement.innerText = `₹ ${totalPrice.toFixed(2)}`;
            modal_container.classList.remove('show');
        })


        open.addEventListener('click', () => {
            modal_container.classList.add('show');
        })
        search.addEventListener('click', () => {
            modal_container.classList.add('show');
        })

        close.addEventListener('click', () => {
            modal_container.classList.remove('show');
        })

        canclebox.addEventListener('click', () => {
            modal_container.classList.remove('show');
        })


        //for create customer model box
        const create_customer = document.getElementById('create_customer')
        const modal_container2 = document.getElementById('modal_container_2');
        const close2 = document.getElementById("close2");
        const cancle2 = document.getElementById("cancle2");


        create_customer.addEventListener('click', () => {
            modal_container2.classList.add('show')
        })
        close2.addEventListener('click', () => {
            modal_container2.classList.remove('show');
        })
        cancle2.addEventListener('click', () => {
            modal_container2.classList.remove('show');
        })




    