from flask import Flask, escape, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True

# app configurations for database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/dbname?charset=utf8mb4'

db = SQLAlchemy(app)


# product table in database
class Product(db.Model):
    plu = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    buying_price = db.Column(db.Integer)
    selling_price = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    transaction_id = db.Column(db.Integer, db.ForeignKey('transaction.id'))

# transaction table in database
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime)
    receipt_number = db.Column(db.Integer)
    total_amount = db.Column(db.Integer)
    card_serial = db.Column(db.Integer)
    change = db.Column(db.Integer)
    products = db.relationship('Product', backref='contains')


@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'