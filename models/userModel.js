
class User {
constructor(id, firstName, lastName,email,phone ,password,dob){
this.id = id;
this.firstName = firstName;
this.lastName = lastName;
this.email = email;
this.phone = phone;
this.password = password;
this.dob = dob;
}
static fromRow(row){
return new User(
row.user_id,
row.first_name,
row.last_name,
row.email,
row.phone,
row.password,
row.dob

)
 
}
}
module.exports = User;