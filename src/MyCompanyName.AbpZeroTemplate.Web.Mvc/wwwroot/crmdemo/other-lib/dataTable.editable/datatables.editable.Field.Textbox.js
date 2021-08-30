(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function TextField(config) {
        Field.call(this, config);
    }

    TextField.prototype = new Field({

		readOnly: false,

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createTextBox();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createTextBox();
            $result.val(value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createTextBox: function() {
            return $("<input>").attr("type", "text").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly);
        }
    });

    $.fn.dataTable.Editable.fields.TextField = $.fn.dataTable.Editable.TextField = TextField;
}
)(jQuery);