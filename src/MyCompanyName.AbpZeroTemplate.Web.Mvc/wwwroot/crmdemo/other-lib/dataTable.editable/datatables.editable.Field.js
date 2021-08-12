(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;

function Field(config) {
        $.extend(true, this, this.__proto__, config);
}

Field.prototype = {
        name: "",
        title: null,
        css: "form-control",
        gridClass: "",
        align: "center",
        width: 100,
        visible: true,
        inserting: true,
        editing: true,

        itemTemplate: function(value, item) {
            return value;
        },


        insertTemplate: function() {
            return "";
        },

        editTemplate: function(value, item) {
            this._value = value;
            return this.itemTemplate(value, item);
        },

        insertValue: function() {
            return "";
        },

        editValue: function() {
            return this._value;
        },

        initHandler: function(element, onChangeCallback){
            
        },
    };

    $.fn.dataTable.Editable.Field = Field;

}));