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

  Template.body.helpers({
    total_deposit: function () {
      var deposits = Deposits.find();
      var total_deposit_amount = 0;
      deposits.forEach( function (deposit) {
        total_deposit_amount += deposit.depositAmount;
      });
      if (isNaN(total_deposit_amount)) total_deposit_amount = 0;
      return total_deposit_amount;
    }
  })

  Template.body.helpers({
    total_withdraw: function () {
      var withdraws = Withdraws.find();
      var total_withdraw_amount = 0;
      withdraws.forEach( function (withdraw) {
        total_withdraw_amount += withdraw.withdrawAmount;
      });
      if (isNaN(total_withdraw_amount)) total_withdraw_amount = 0;
      return total_withdraw_amount;
    }
  })

  Template.body.events({
    "submit .new-deposit": function (event) {
      event.preventDefault();

      var amount = event.target.deposit.value;
      Deposits.insert({
        depositAmount: Number(amount),
        createdAt: new Date().toISOString().slice(0, 10)
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
        createdAt: new Date().toISOString().slice(0, 10)
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
