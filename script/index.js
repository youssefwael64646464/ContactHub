var FullNameContact=document.getElementById("FullName")
var PhoneNumberContact=document.getElementById("PhoneNumber")
var EmailAddressContact=document.getElementById("EmailAddress")
var AddressContact=document.getElementById("Address")
var GroupContact=document.getElementById("Group")
var NotesContact=document.getElementById("Notes")
var checkFavoriteContact=document.getElementById("checkFavorite")
var checkEmergencyContact=document.getElementById("checkEmergency")
var saveButton = document.getElementById("saveButton")
var searchInput=document.getElementById("search")



var ContactList=[];


if(localStorage.getItem("ContactContainer")){
  ContactList=JSON.parse(localStorage.getItem("ContactContainer"))
  displayContact()
  updateStats()
   displayFavorites()
   displayEmergency()
}



















function AddContact(){

    if(!validateFormInput(FullNameContact)){

        Swal.fire({
            title: "Missing Name",
            text: "Please enter a name for the contact!",
            icon: "error"
        });

    }

    else if(!validateFormInput(PhoneNumberContact)){

        Swal.fire({
            title: "Missing Phone",
            text: "Please enter a phone number!",
            icon: "error"
        });

    }else {

        var Contact = {

            name: FullNameContact.value,
            Phone: PhoneNumberContact.value,
            Email: EmailAddressContact.value,
            Adress: AddressContact.value,
            Group: GroupContact.value,
            Notes: NotesContact.value,
            Favorite: checkFavoriteContact.checked,
            Emergency: checkEmergencyContact.checked

        };
        for(var i = 0; i < ContactList.length; i++){

    if(ContactList[i].Phone == Contact.Phone){

      Swal.fire({
            title: "Duplicate Phone Number",
            text: "A contact with this phone number already exists: Hedley Dudley",
            icon: "error"
        });
        return;
    }
}

        ContactList.push(Contact);

        localStorage.setItem(
            "ContactContainer",
            JSON.stringify(ContactList)
        );

        clearContact();

        displayContact();
        updateStats();
        displayFavorites();
        displayEmergency();
         bootstrap.Modal.getInstance(
        document.getElementById("exampleModal")
    ).hide();

        Swal.fire({
            title: "Added!",
            text: "Contact added successfully!",
            icon: "success"
        });
    }
}
function clearContact(){
FullNameContact.value=""
PhoneNumberContact.value=""
EmailAddressContact.value=""
AddressContact.value=""
GroupContact.value=""
NotesContact.value =""
checkFavoriteContact.value=""
checkEmergencyContact.value=""


}



function displayContact(){

  blackBox=""

  for(var i=0;i<ContactList.length;i++){
      var favoriteIcon = ""
var emergencyIcon = ""
if(ContactList[i].Favorite){
    favoriteIcon = `
             <div class="star-image content-center rounded-circle position-absolute">
          <i class="fa-solid fa-star" style="color: rgb(255, 255, 255);"></i> </div>
    `
}

if(ContactList[i].Emergency){
    emergencyIcon = `
       <div class="heart-image content-center rounded-circle position-absolute">
            <i class="fa-solid fa-heart-pulse " style="color: rgb(255, 255, 255);"></i>
             </div>
        
    `
}
    blackBox += `<div class="col-lg-6">
    <div class="inner bg-white border border-1 rounded-3 mb-3">
      <div class="inner-content">
        <div class="d-flex align-items-center gap-3 mb-3" >
           <div class="user position-relative users-color rounded-3 text-white content-center" > 
           ${ContactList[i].name[0]}  
            ${emergencyIcon}
            ${favoriteIcon}
          
          
          
          </div>
          
           <div class="user-info">
             <h3>${ContactList[i].name}</h3>
               <div class="d-flex align-items-center gap-2" >
             <div class="call rounded-3 content-center bg-call">
              <i class="fa-solid fa-phone fa-xs" style="color: rgb(21, 93, 252);"></i>
            </div>
              <span class="fw-medium">${ContactList[i].Phone}</span>
            </div> 
          </div>
            </div>


            <div class="d-flex align-items-center gap-2 mb-2" >
              <div class="email-info bg-email content-center rounded-3">
                 <i class="fa-solid fa-envelope fa-xs" style="color: rgb(127, 34, 254);"></i></div> 
                 <span class="email-address fw-medium">${ContactList[i].Email}</span>

            </div>
            <div class="d-flex align-items-center gap-2 mb-2" >
              <div class="email-info bg-location content-center rounded-3">
            <i class="fa-solid fa-location-dot fa-xs" style="color: rgb(0, 153, 102);"></i></div> 
                 <span class="email-address fw-medium">${ContactList[i].Adress}</span>

            </div>
            <div>
               <span class="frin rounded-2">friends</span>
                <span class="Emergency rounded-2"> 
                    <i class="fa-solid fa-heart-pulse fa-width-auto"></i> Emergency





</span>
</div>


      </div>
      <div class="  action-footer d-flex align-items-center justify-content-between" >
<div class="d-flex align-items-center gap-2"> 
<a href="tel:${ContactList[i].Phone}" 
           class="rounded-3 content-center bg-footer-call">
            <i class="fa-solid fa-phone" style="color: rgb(0, 153, 102);"></i>
        </a>

<button  class="rounded-3 bg-footer-email content-center border border-0">
   <a href="mailto:${ContactList[i].Email}" 
           class="rounded-3 bg-footer-email content-center">
            <i class="fa-solid fa-envelope" style="color: rgb(127, 34, 254);"></i>
        </a>
</button>
</div>
<div class="d-flex align-items-center gap-2">
  <button onclick="FavoriteContact(${i})" class="rounded-3 bg-star-footer content-center border border-0">
<i class="fa-solid fa-star" style="color: rgb(255, 185, 0);"></i>
</button>

<button onclick="EmergencyContact(${i})" class="rounded-3 bg-heart-footer  content-center border border-0">
  <i class="fa-solid fa-heart-pulse fa-width-auto" ></i>
</button><button onclick="EditContact(${i})"   data-bs-toggle="modal"
    data-bs-target="#exampleModal"
     class="rounded-3 bg-edit-footer content-center border border-0">
  <i class="fa-solid fa-pen" ></i>
</button>
<button onclick="DeleteContent(${i})" class="rounded-3 bg-Delete-footer content-center border border-0">
<i class="fa-solid fa-trash"></i>
</button>
</div>
      </div>
    </div>
  </div>`

  }
  document.getElementById("row").innerHTML=blackBox
}

function DeleteContent(index){

    Swal.fire({
        title: "Delete Contact?",
        text: "Are you sure you want to delete Gail Fry? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#554",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {

            ContactList.splice(index, 1);

            displayContact();
            updateStats();
            displayFavorites();
            displayEmergency();

            localStorage.setItem(
                "ContactContainer",
                JSON.stringify(ContactList)
            );

            Swal.fire({
                title: "Deleted!",
                text: "Your contact has been deleted.",
                icon: "success"
            });
        }

    });
}

var updateIndex;
function EditContact(index){
  FullNameContact.value=ContactList[index].name
  updateIndex=index
  PhoneNumberContact.value=ContactList[index].Phone
  EmailAddressContact.value=ContactList[index].Email
  AddressContact.value=ContactList[index].Adress
  GroupContact.value=ContactList[index].Group
  NotesContact.value=ContactList[index].Notes
  checkFavoriteContact.checked=ContactList[index].Favorite
  checkEmergencyContact.checked=ContactList[index].Emergency

  saveButton.setAttribute("onclick", "UpdateContact()")


}
function UpdateContact(){
    if(!validateFormInput(FullNameContact)){

        Swal.fire({
            title: "Missing Name",
            text: "Please enter a name for the contact!",
            icon: "error"
        });

    }

    else if(!validateFormInput(PhoneNumberContact)){

        Swal.fire({
            title: "Missing Phone",
            text: "Please enter a phone number!",
            icon: "error"
        });

    }else {
  ContactList[updateIndex].name=FullNameContact.value
  ContactList[updateIndex].Phone=PhoneNumberContact.value
  ContactList[updateIndex].Email=EmailAddressContact.value
  ContactList[updateIndex].Adress= AddressContact.value
  ContactList[updateIndex].Group=GroupContact.value
  ContactList[updateIndex].Notes=NotesContact.value
  ContactList[updateIndex].Favorite= checkFavoriteContact.checked
  ContactList[updateIndex].Emergency=checkEmergencyContact.checked



  localStorage.setItem("ContactContainer",JSON.stringify(ContactList))
  
  

  clearContact()
displayContact()
updateStats()
displayFavorites()
displayEmergency()
saveButton.setAttribute("onclick", "AddContact()")
     bootstrap.Modal.getInstance(
        document.getElementById("exampleModal")
    ).hide();
      Swal.fire({
            title: "UpDATed!",
            text: "Contact added successfully!",
            icon: "success"
        });
    }
  
  
}


function search(){
    var text=searchInput.value
    blackBox=""


      for(var i=0;i<ContactList.length;i++){
  if(ContactList[i].name.toLowerCase().includes(text.toLowerCase())){
        blackBox +=  `<div class="col-lg-6">
    <div class="inner bg-white border border-1 rounded-3 mb-3">
      <div class="inner-content">
        <div class="d-flex align-items-center gap-3 mb-3" >
           <div class="user position-relative users-color rounded-3 text-white content-center" > ${ContactList[i].name[0]}  <div class="heart-image content-center rounded-circle position-absolute">
            <i class="fa-solid fa-heart-pulse " style="color: rgb(255, 255, 255);"></i> </div>
             <div class="star-image content-center rounded-circle position-absolute">
          <i class="fa-solid fa-star" style="color: rgb(255, 255, 255);"></i> </div></div>
          
           <div class="user-info">
             <h3>${ContactList[i].name}</h3>
               <div class="d-flex align-items-center gap-2" >
             <div class="call rounded-3 content-center bg-call">
              <i class="fa-solid fa-phone fa-xs" style="color: rgb(21, 93, 252);"></i>
            </div>
              <span class="fw-medium">${ContactList[i].Phone}</span>
            </div> 
          </div>
            </div>


            <div class="d-flex align-items-center gap-2 mb-2" >
              <div class="email-info bg-email content-center rounded-3">
                 <i class="fa-solid fa-envelope fa-xs" style="color: rgb(127, 34, 254);"></i></div> 
                 <span class="email-address fw-medium">${ContactList[i].Email}</span>

            </div>
            <div class="d-flex align-items-center gap-2 mb-2" >
              <div class="email-info bg-location content-center rounded-3">
            <i class="fa-solid fa-location-dot fa-xs" style="color: rgb(0, 153, 102);"></i></div> 
                 <span class="email-address fw-medium">${ContactList[i].Adress}</span>

            </div>
            <div>
               <span class="frin rounded-2">friends</span>
                <span class="Emergency rounded-2"> 
                    <i class="fa-solid fa-heart-pulse fa-width-auto"></i> Emergency





</span>
</div>


      </div>
      <div class="  action-footer d-flex align-items-center justify-content-between" >
<div class="d-flex align-items-center gap-2"> 
  <a href="" class="rounded-3 content-center bg-footer-call ">
    <i class="fa-solid fa-phone" style="color: rgb(0, 153, 102);"></i>
  </a>
<button class="rounded-3 bg-footer-email content-center border border-0">
  <i class="fa-solid fa-envelope" style="color: rgb(127, 34, 254);"></i>
</button>
</div>
<div class="d-flex align-items-center gap-2">
  <button class="rounded-3 bg-star-footer content-center border border-0">
<i class="fa-solid fa-star" style="color: rgb(255, 185, 0);"></i>
</button>

<button class="rounded-3 bg-heart-footer  content-center border border-0">
  <i class="fa-solid fa-heart-pulse fa-width-auto" ></i>
</button><button onclick="EditContact(${i})" class="rounded-3 bg-edit-footer content-center border border-0">
  <i class="fa-solid fa-pen" ></i>
</button>
<button onclick="DeleteContent(${i})" class="rounded-3 bg-Delete-footer content-center border border-0">
<i class="fa-solid fa-trash"></i>
</button>
</div>
      </div>
    </div>
  </div>`
  }

  }
  document.getElementById("row").innerHTML=blackBox
}













	function updateStats(){

    var total = ContactList.length

    var favorite = 0
    var emergency = 0

    for(var i = 0; i < ContactList.length; i++){

        if(ContactList[i].Favorite){
            favorite++
        }

        if(ContactList[i].Emergency){
            emergency++
        }

    }

    document.getElementById("totalCount").innerHTML = total
    document.getElementById("favoriteCount").innerHTML = favorite
    document.getElementById("emergencyCount").innerHTML = emergency
}


function displayFavorites(){

    var favoritesBox = ""

    for(var i = 0; i < ContactList.length; i++){

        if(ContactList[i].Favorite){

            favoritesBox += `
                <div class="user-info-favorites mb-2 d-flex align-items-center justify-content-between rounded-3">

                    <div class="d-flex gap-3">

                        <div class="icon-info-favorites users-color rounded-3 text-white content-center">
                            ${ContactList[i].name[0]}
                        </div>

                        <div>
                            <h4 class="m-0">${ContactList[i].name}</h4>
                            <p class="m-0">${ContactList[i].Phone}</p>
                        </div>

                    </div>

                    <div class="call-favorites">

                        <a href="tel:${ContactList[i].Phone}" class="rounded-3 call-favorites-icon content-center bg-footer-call">
                            <i class="fa-solid fa-phone"></i>
                        </a>

                    </div>

                </div>
            `
        }
    }

    document.getElementById("favorites").innerHTML = favoritesBox
}
function displayEmergency(){

    var emergencyBox = ""

    for(var i = 0; i < ContactList.length; i++){

        if(ContactList[i].Emergency){

            emergencyBox += `
                <div class="user-info-favorites mb-2 d-flex align-items-center justify-content-between rounded-3">

                    <div class="d-flex gap-3">

                        <div class="icon-info-favorites users-color rounded-3 text-white content-center">
                            ${ContactList[i].name[0]}
                        </div>

                        <div>
                            <h4 class="m-0">${ContactList[i].name}</h4>
                            <p class="m-0">${ContactList[i].Phone}</p>
                        </div>

                    </div>

                    <div class="call-favorites">

                        <a href="tel:${ContactList[i].Phone}" class="rounded-3 call-Emergency-icon content-center bg-footer-call">
                            <i class="fa-solid fa-phone"></i>
                        </a>

                    </div>

                </div>
            `
        }
    }

    document.getElementById("emergency").innerHTML = emergencyBox
}

function FavoriteContact(index){

    ContactList[index].Favorite = !ContactList[index].Favorite

    localStorage.setItem("ContactContainer", JSON.stringify(ContactList))

    displayContact()
    updateStats()
    displayFavorites()
}
function EmergencyContact(index){

    ContactList[index].Emergency = !ContactList[index].Emergency

    localStorage.setItem("ContactContainer", JSON.stringify(ContactList))

    displayContact()
    updateStats()
    displayEmergency()
}





function validateFormInput(ele) {

    var regex = {
        FullName: /^[A-Z][A-Za-z ]{1,49}$/,
        PhoneNumber: /^01[0125][0-9]{8}$/,
        EmailAddress: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        Address: /^[A-Za-z0-9\u0600-\u06FF\s,./#-]{5,100}$/,
        Group: /^(family|friends|work|school|other)$/,
        Notes: /^(?=.{2,500}$).+$/
    };

    var result = regex[ele.id].test(ele.value);

    var errorMessage = ele.nextElementSibling;

    if (errorMessage) {
        if (result === false) {
            errorMessage.classList.remove("d-none");
            errorMessage.classList.add("d-block");
        } else {
            errorMessage.classList.remove("d-block");
            errorMessage.classList.add("d-none");
        }
    }

    return result;
}




