const apiURL = "https://fakestoreapi.com/users";

//get all users
export async function getUsers() {
  try {
    const response = await fetch(`${apiURL}`);
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Error in getting all users ", error);
  }
}

// get a single user
export async function getUser(id) {
  try {
    const response = await fetch(`${apiURL}/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in getting user ${id} `, error);
  }
}

// get limited number of users and/or
// sort users (default is ascending)
export async function adjustUsers(limit = "", sort = "") {
  try {
    const response = await fetch(`${apiURL}?limit=${limit}&sort=${sort}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in filtering users `, error);
  }
}

// add a new user
export async function addUser(email, username, password, userInfo) {
  try {
    const response = await fetch(`${apiURL}`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        name: {
          firstname: userInfo.firstName,
          lastName: userInfo.lastName,
        },
        address: {
          city: userInfo.city,
          street: userInfo.address,
          number: userInfo.addressNum,
          zipcode: userInfo.zipcode,
        },
        phone: userInfo.phone,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in adding user ${username} `, error);
  }
}

// update a user
// ex. user info
// {
//     email:'John@gmail.com',
//     username:'johnd',
//     password:'m38rmF$',
//     name:{
//         firstname:'John',
//         lastname:'Doe'
//     },
//     address:{
//         city:'kilcoole',
//         street:'7835 new road',
//         number:3,
//         zipcode:'12926-3874',
//         geolocation:{
//             lat:'-37.3159',
//             long:'81.1496'
//         }
//     },
//     phone:'1-570-236-7033'
//     }
export async function updateUser(userId, userInfo) {
  try {
    let method = "PUT";
    if (getUser(userId)) {
      method = "PATCH";
    }
    const response = await fetch(`${apiURL}/${userId}`, {
      method: method,
      body: JSON.stringify(userInfo),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in updating user ${userId} info `, error);
  }
}

// delete a user
export async function deleteUser(userId) {
  try {
    const response = await fetch(`${apiURL}/${userId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in deleting user ${userId} `, error);
  }
}
