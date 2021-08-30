(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function DateTimeField(config) {
        Field.call(this, config);
    }

    DateTimeField.prototype = new Field({

        readOnly: false,
        css: "form-control datepicker",

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createDateTimeField();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createDateTimeField();
            $result.val(value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createDateTimeField: function() {
            return $("<input>").attr("type", "text").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly);
        }
    });

    $.fn.dataTable.Editable.fields.DateTimeField = $.fn.dataTable.Editable.DateTimeField = DateTimeField;
}
)(jQuery);