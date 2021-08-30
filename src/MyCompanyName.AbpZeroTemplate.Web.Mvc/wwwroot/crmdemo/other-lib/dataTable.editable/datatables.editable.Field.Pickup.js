(function ($) {
    var Field = $.fn.dataTable.Editable.Field;

    function PickupField(config) {
        Field.call(this, config);
    }

    PickupField.prototype = new Field({

        readOnly: false,

        insertTemplate: function () {
            if (!this.inserting)
                return "";

            return this.insertControl = this._createPickup();
        },

        editTemplate: function (value) {
            if (!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createPickup();
            $result.val(value);
            return $result;
        },

        insertValue: function () {
            return this.insertControl.val();
        },

        editValue: function () {
            return this.editControl.val();
        },

        _createPickup: function () {
            var inputGroup = $('<div>').attr("class", "input-group" + " " + this.gridClass);
            var pickDiv = $('<div>').attr("class", "input-group-append");
            var cancelDiv = $('<div>').attr("class", "input-group-prepend");
            var pickupBtn = $('<button>').attr("class", "btn btn-primary blue").attr("id", "Open" + this.dataName + "Button").html("<i class='fa fa-search'></i>" + app.localize('Pick'));
            
            pickDiv.append(pickupBtn);
            var cancelBtn = $('<button>').attr("class", "btn btn-danger").attr("type", "button").attr("id", "Clear" + this.dataName + "Button").html('<i class="la la-eraser"></i>');
            
            cancelDiv.append(cancelBtn);
            var backendField = $("<input>").attr("type", "hidden").attr("name", this.backendFieldName);
            
            $("<input>").attr("type", "text").attr("class", this.css).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly).appendTo(inputGroup);
            pickDiv.appendTo(inputGroup);
            cancelDiv.appendTo(inputGroup);
            inputGroup.append(backendField);
            return inputGroup;
        }
    });

    $.fn.dataTable.Editable.fields.PickupField = $.fn.dataTable.Editable.PickupField = PickupField;
}
)(jQuery);