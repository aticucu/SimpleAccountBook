Deposits = new Mongo.Collection("deposits");
Withdraws = new Mongo.Collection("withdraws");

if (Meteor.isClient) {
  Template.body.helpers({
    deposits: function () {
      return Deposits.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.helpers({
    withdraws: function () {
      return Withdraws.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-deposit": function (event) {
      event.preventDefault();

      var amount = event.target.deposit.value;
      Deposits.insert({
        depositAmount: Number(amount),
        createdAt: new Date()
      });

      event.target.deposit.value = "";
    }
  });

  Template.body.events({
    "submit .new-withdraw": function (event) {
      event.preventDefault();

      var amount = event.target.withdraw.value;
      Withdraws.insert({
        withdrawAmount: Number(amount),
        createdAt: new Date()
      });

      event.target.withdraw.value = "";
    }
  });

  Template.body.events({
    "click .toggle-checked": function () {
      Deposits.update(this._id, {
        $set: {checked: ! this.checked}
      });
      Withdraws.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Deposits.remove(this._id);
      Withdraws.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
