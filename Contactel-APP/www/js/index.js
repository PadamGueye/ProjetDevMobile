document.addEventListener("deviceready", function() {
    loadContacts();
    document.getElementById("addContactForm").addEventListener("submit", addContact);
}, false);

function loadContacts() {
    let options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ["name", "phoneNumbers"];
    navigator.contacts.find(fields, showContacts, handleError, options);
}

function showContacts(contacts) {
    let code = '';
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name && contacts[i].phoneNumbers) {
            code += `
                <li>
                    <a href="#">
                        <img class="avatar" src="img/avatar.png" alt="profile photo">
                        <h1>${contacts[i].name.formatted}</h1>
                        <p>${contacts[i].phoneNumbers[0].value}</p>
                    </a>
                </li>
            `;
        }
    }
    document.getElementById("contactList").innerHTML = code;
    $('#contactList').listview('refresh');
}

function handleError(error) {
    console.log(error);
}

function addContact(event) {
    event.preventDefault();
    
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let telephone = document.getElementById("telephone").value;
    
    if (prenom && nom && telephone) {
        let contact = navigator.contacts.create();
        contact.displayName = `${prenom} ${nom}`;
        contact.nickname = prenom;

        let name = new ContactName();
        name.givenName = prenom;
        name.familyName = nom;
        contact.name = name;

        let phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', telephone, true);
        contact.phoneNumbers = phoneNumbers;

        saveContact(contact);
    } else {
        alert("Tous les champs sont obligatoires.");
    }
}

function saveContact(contact) {
    contact.save(function() {
        alert("Contact ajouté avec succès!");
        $.mobile.changePage("#home");
        loadContacts();
    }, function(error) {
        console.log("Erreur lors de l'ajout du contact: " + error);
    });
}
