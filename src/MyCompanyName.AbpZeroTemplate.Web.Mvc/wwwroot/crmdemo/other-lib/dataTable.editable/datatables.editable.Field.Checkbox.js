(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function CheckboxField(config) {
        Field.call(this, config);
    }

    CheckboxField.prototype = new Field({

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createCheckbox();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createCheckbox();
            $result.prop("checked", value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.is(":checked");
        },

        editValue: function() {
            return this.editControl.is(":checked");
        },

        _createCheckbox: function() {
            return $("<input>").attr("type", "checkbox").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName);
        }
    });

    $.fn.dataTable.Editable.fields.CheckboxField = $.fn.dataTable.Editable.CheckboxField = CheckboxField;
}
)(jQuery);