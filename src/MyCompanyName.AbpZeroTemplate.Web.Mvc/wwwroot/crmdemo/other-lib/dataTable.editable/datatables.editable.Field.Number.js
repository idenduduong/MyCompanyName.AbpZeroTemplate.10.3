(function($){
    var Field = $.fn.dataTable.Editable.Field;

    function Number(config) {
        Field.call(this, config);
    }

    Number.prototype = new Field({
        css: "form-control numeric",
		readOnly: false,

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createNumberField();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createNumberField();
            $result.val(value);
            return $result;
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createNumberField: function() {
            return $("<input>").attr("type", "text").attr("class", this.css + " " + this.gridClass).attr("name", this.dataName)
                .prop("readonly", !!this.readOnly);
        }
    });

    $.fn.dataTable.Editable.fields.Number = $.fn.dataTable.Editable.Number = Number;
}
)(jQuery);