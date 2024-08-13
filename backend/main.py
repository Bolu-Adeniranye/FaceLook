# CRUD (Create, Read, Update, delete)

#Create 
# - first_name
# - last_name
# - email

# Request -> Send something to API (FRONTEND does this)
# type: GET -> access some type of resource 
#     POST -> Create something new aka new contact
#     PUT/PATCH -> Update something/ update a contact
#     DELETE 
# json: {

# }

# Response -> Backend responds to Request
# status: 200, 404, 400, 403 -> specifies if the request was successful
# json: {

# }

from config import app, db
from flask import jsonify, request
from models import Contact


@app.route("/contacts", methods=["GET"])
def get_contacts():
    # Gets all the Contacts in our databse but in Python Object format 
    contacts = Contact.query.all()
    # map over contacts and run a callback/anonymous function (lambda) which runs the to_json method each contact has, this turns the python objects into json and returns them as a list 
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts}), 200


@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return ( 
            jsonify({"message": "You must include a first name, last name and email"}),
              400,
        )
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        # Add to database session > Stage change to Database 
        db.session.add(new_contact)

        # Actually commit the database session with new_contact object 
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User Created"}), 201


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)


    db.session.commit()

    return jsonify({"message": "User Updated"}), 201


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User successfullly deleted"}), 201




# Prevents app from running if we import main.py into another file 
if __name__ == "__main__":
    with app.app_context():
        # Create all the models we have in our database
        db.create_all()

# Run database, endpoints and API
    app.run(debug=True)