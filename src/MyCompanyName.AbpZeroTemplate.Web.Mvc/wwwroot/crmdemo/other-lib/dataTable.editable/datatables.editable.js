/*! Editable 0.0.1-dev
 * 2018 ABCSOFT - datatables.net/license
 */

/**
 * @summary     Editable
 * @description Editable tables plug-in for DataTables
 * @version     0.0.1-dev
 * @file        dataTables.editable.js
 * @author      ABCSOFT (www.abcsoft.vn)
 * @contact     www.abcsoft.vn/contact
 * @copyright   Copyright 2018 ABCSOFT.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	}
	else {
		// Browser
		factory(jQuery, window, document);
	}
}(function ($, window, document, undefined) {
	'use strict';
	var DataTable = $.fn.dataTable;


	/**
	 * Editable is a plug-in for the DataTables library that makes use of
	 * DataTables' ability to edit data with localStorage.
	 * The end result is that rows data will be edited with dynamically built form.
	 *
	 *  @class
	 *  @param {object} settings DataTables settings object for the host table
	 *  @param {object} [opts] Configuration options
	 *  @requires jQuery 1.7+
	 *  @requires DataTables 1.10.3+
	 *
	 *  @example
	 *      $('#example').DataTable( {
	 *        responsive: true
	 *      } );
	 *    } );
	 */

	var Editable = function (settings, opts) {
		// Sanity check that we are using DataTables 1.10 or newer
		if (!DataTable.versionCheck || !DataTable.versionCheck('1.10.10')) {
			throw 'DataTables Responsive requires DataTables 1.10.10 or newer';
		}

		this.s = {
			dt: new DataTable.Api(settings),
			columns: [],
			current: []
		};

		// Check if editable has already been initialised on this table
		if (this.s.dt.settings()[0] && this.s.dt.settings()[0]._editable) {
			return;
		}

		// details is an object, but for simplicity the user can give it as a string
		// or a boolean
		if (opts && typeof opts.details === 'string') {
			opts.details = { type: opts.details };
		}
		else if (opts && opts.details === false) {
			opts.details = { type: false };
		}
		else if (opts && opts.details === true) {
			opts.details = { type: 'inline' };
		}
		this.columns = [];
		this.c = $.extend(true, {}, Editable.defaults, DataTable.defaults.editable, opts);
		settings.editable = this;
		this._constructor();
	};


	$.extend(Editable.prototype, {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Constructor
		 */

		/**
		 * Initialise the Editable instance
		 *
		 * @private
		 */
		_constructor: function () {
			var that = this;
			var dt = this.s.dt;
			var dtPrivateSettings = dt.settings()[0];
			// todo check
			dt.settings()[0]._editable = this;
			// Details handler
			var details = this.c.details;
			that._classLogic(dtPrivateSettings);
			if (details.type !== false) {
				that._editFormInit();
				$(dt.table().node()).addClass('dtr-' + details.type);
			}

			// todo check
			// On Ajax reload we want to reopen any child rows which are displayed
			// by responsive
			// dt.on( 'preXhr.dtr', function () {
			// 	var rowIds = [];
			// 	dt.rows().every( function () {
			// 		if ( this.child.isShown() ) {
			// 			rowIds.push( this.id(true) );
			// 		}
			// 	} );

			// 	dt.one( 'draw.dtr', function () {
			// 		that._resizeAuto();
			// 		that._resize();

			// 		dt.rows( rowIds ).every( function () {
			// 			that._detailsDisplay( this, false );
			// 		} );
			// 	} );
			// });
		},


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		 * Private methods
		 */

		/**
		 * Create the internal `columns` array with information about the columns
		 * for the table. 
		 *
		 * @private
		 */
		_classLogic: function (settings) {
			var that = this;
			var dt = this.s.dt;
			var aoColumns = settings.aoColumns;
			that.columns = $.map(aoColumns, function (column) {
				if ($.isPlainObject(column)) {
					var fieldConstructor = (column.controlType && Editable.fields[column.controlType]) || Editable.Field;
					column = new fieldConstructor(column);
				}
				return column;
			});
		},

		/**
		 * Show the edit form for the child row
		 *
		 * @param  {DataTables.Api} row    API instance for the row
		 * @param  {boolean}        update Update flag
		 * @private
		 */
		_editFormDisplay: function (row, update) {
			var that = this;
			var dt = this.s.dt;
			var details = this.c.details;

			if (details && details.type !== false) {
				var edi = details.display(row, update, function () {
					// render form from data object
					return details.renderer(
						dt, row[0], that._detailsObj(row[0]), that._renderTemplate, update
					);
				});

				if (edi === true || edi === false) {
					$(dt.table().node()).triggerHandler('edit-form-display.dt', [dt, row, edi, update]);
				}
			}
		},


		/**
		 * Initialisation for the edit form handler
		 *
		 * @private
		 */
		_editFormInit: function () {
			var that = this;
			var dt = this.s.dt;
			var details = this.c.details;

			// The inline type always uses the first child as the target
			// todo check
			if (details.type === 'inline') {
				details.target = 'td:not(first-child), th:first-child';
			}

			// Keyboard accessibility
			// dt.on( 'draw.dtr', function () {
			// 	that._tabIndexes();
			// } );
			// that._tabIndexes(); // Initial draw has already happened

			// $( dt.table().body() ).on( 'keyup.dtr', 'td, th', function (e) {
			// 	if ( e.keyCode === 13 && $(this).data('dtr-keyboard') ) {
			// 		$(this).click();
			// 	}
			// } );

			// type.target can be a string jQuery selector or a column index
			var target = details.target;
			var selector = typeof target === 'string' ? target : 'td, th';
			var createSelector = typeof createTarget=='string' ? createTarget: 'dt-create-btn';
			// Click handler to show / hide the create form when they are available
			$(dt.table().body())
				.on('click', selector, function (e) {
						that._editFormDisplay(row, false);
				});

			// Click handler to show / hide the edit form when they are available
			$(dt.table().body())
				.on('click.dtr mousedown.dtr mouseup.dtr', selector, function (e) {

					// Check that the row is actually a DataTable's controlled node
					if ($.inArray($(this).closest('tr').get(0), dt.rows().nodes().toArray()) === -1) {
						return;
					}

					// For column index, we determine if we should act or not in the
					// handler - otherwise it is already okay
					if (typeof target === 'number') {
						var targetIdx = target < 0 ?
							dt.columns().eq(0).length + target :
							target;

						if (dt.cell(this).index().column !== targetIdx) {
							return;
						}
					}

					// $().closest() includes itself in its check
					var row = dt.row($(this).closest('tr'));

					// Check event type to do an action
					if (e.type === 'click') {
						// The renderer is given as a function so the caller can execute it
						// only when they need (i.e. if hiding there is no point is running
						// the renderer)
						that._editFormDisplay(row, false);
					}
					else if (e.type === 'mousedown') {
						// For mouse users, prevent the focus ring from showing
						$(this).css('outline', 'none');
					}
					else if (e.type === 'mouseup') {
						// And then re-allow at the end of the click
						$(this).blur().css('outline', '');
					}
				});
		},

		// todo check
		/**
		 * Get the details to pass to a renderer for a row
		 * @param  {int} rowIdx Row index
		 * @private
		 */
		_detailsObj: function (rowIdx) {
			var that = this;
			var dt = this.s.dt;
			var data;
			if(rowIdx && dt.row(rowIdx)){
				data = dt.row(rowIdx).data();
			}
			
			
			return $.map(that.columns, function (col) {
				// Never and control columns should not be passed to the renderer
				if (col.controlType == "Control") {
					return;
				}
				
				return $.extend(true, col, {
					title: col.sTitle,
					data: data? data[col.data]:null,
					dataName: col.data,
					backendFieldName: col.backendFieldName,
					backendFieldData: data? data[col.backendFieldName]: null,
					rowIndex: rowIdx})
			});
		},

		_renderTemplate: function (source, context, config) {
			var getOrApply = function (value, context) {
				if ($.isFunction(value)) {
					return value.apply(context, $.makeArray(arguments).slice(2));
				}
				return value;
			};
			var args = [];
			for (var key in config) {
				args.push(config[key]);
			}

			args.unshift(source, context);

			source = getOrApply.apply(null, args);
			return (source === undefined || source === null) ? "" : source;
		},
	});

	/**
	 * Field Type
	 */

	Editable.fields = {};


	/**
	 * Display methods - functions which define how the edit form should be shown
	 * in the table.
	 *
	 * @namespace
	 * @name Editable.defaults
	 * @static
	 */
	Editable.display = {
		childRow: function (row, update, render) {
			if (update) {
				if ($(row.node()).hasClass('parent')) {
					row.child(render(), 'child').show();

					return true;
				}
			}
			else {
				if (!row.child.isShown()) {
					row.child(render(), 'child').show();
					$(row.node()).addClass('parent');

					return true;
				}
				else {
					row.child(false);
					$(row.node()).removeClass('parent');

					return false;
				}
			}
		},
		// todo check
		// childRowImmediate: function ( row, update, render ) {
		// 	if ( (! update && row.child.isShown()) || ! row.responsive.hasHidden() ) {
		// 		// User interaction and the row is show, or nothing to show
		// 		row.child( false );
		// 		$( row.node() ).removeClass( 'parent' );

		// 		return false;
		// 	}
		// 	else {
		// 		// Display
		// 		row.child( render(), 'child' ).show();
		// 		$( row.node() ).addClass( 'parent' );

		// 		return true;
		// 	}
		// },

		// This is a wrapper so the modal options for Bootstrap and jQuery UI can
		// have options passed into them. This specific one doesn't need to be a
		// function but it is for consistency in the `modal` name
		modal: function (options) {
			return function (row, update, render) {
				if (!update) {
					// Show a modal
					var close = function () {
						modal.remove(); // will tidy events for us
						$(document).off('keypress.dtr');
					};

					var modal = $('<div class="dtr-modal"/>')
						.append($('<div class="dtr-modal-display"/>')
							.append($('<div class="dtr-modal-content"/>')
								.append(render())
							)
							.append($('<div class="dtr-modal-close">&times;</div>')
								.click(function () {
									close();
								})
							)
						)
						.append($('<div class="dtr-modal-background"/>')
							.click(function () {
								close();
							})
						)
						.appendTo('body');

					$(document).on('keyup.dtr', function (e) {
						if (e.keyCode === 27) {
							e.stopPropagation();

							close();
						}
					});
				}
				else {
					$('div.dtr-modal-content')
						.empty()
						.append(render());
				}

				if (options && options.header) {
					$('div.dtr-modal-content').prepend(
						'<h2>' + options.header(row) + '</h2>'
					);
				}
			};
		}
	};


	/**
	 * Display methods - functions which define how the hidden data should be shown
	 * in the table.
	 *
	 * @namespace
	 * @name Editable.defaults
	 * @static
	 */
	Editable.renderer = {
		horizontalForm: function () {
			return function (api, rowIdx, controls, templateRenderer, update) {
				var div = $('<div style="border-bottom:1px solid #ccc; border-top:1px solid #ccc; padding-top: 10px" data-dtr-index="' + rowIdx + '" class="dtr-details"></div>');
				var numberOfElementsInARow = 4;
				var totalSize = 12 / numberOfElementsInARow;
				var labelSize;
				var controlSize;
				switch (0) {
					case totalSize % 3:
						labelSize = totalSize / 3;
						break;
					case totalSize % 4:
						labelSize = totalSize / 4;
						break;
					case totalSize % 5:
						labelSize = totalSize * 2 / 5;
						break;
					default:
						labelSize = 1;
						break;
					}
					
					controlSize = totalSize - labelSize;
					var row = $('<div data-dt-row="' + rowIdx + '" class="form-group m-form__group row table-row"></div>');
					var data = $.each(controls, function (i, col) {
						$.extend(true, col, { gridClass: "col-md-" + controlSize } );
						$(
							'<label class="col-md-' + labelSize + ' col-form-label">' + col.title +
							'</label> '
						).appendTo(row);
						$(templateRenderer(update? col.editTemplate: col.insertTemplate, col)).appendTo(row);
						if (i == controls.length - 1 || numberOfElementsInARow == 1 || (i + 1) % numberOfElementsInARow == 0) {
							row.appendTo(div);
							row = $('<div class="form-group m-form__group row"></div>');
						}
					});

				return div;
			};
		},

		tableAll: function (options) {
			options = $.extend({
				tableClass: ''
			}, options);

			return function (api, rowIdx, columns) {
				var data = $.map(columns, function (col) {
					return '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
						'<td>' + col.title + ':' + '</td> ' +
						'<td>' + col.data + '</td>' +
						'</tr>';
				}).join('');

				return $('<table class="' + options.tableClass + ' dtr-details" width="100%"/>').append(data);
			}
		}
	};


	/**
	 * Editable default settings for initialisation
	 *
	 * @namespace
	 * @name Editable.defaults
	 * @static
	 */
	Editable.defaults = {
		/**
		 * Enable / disable auto hiding calculations. It can help to increase
		 * performance slightly if you disable this option, but all columns would
		 * need to have breakpoint classes assigned to them
		 *
		 * @type {Boolean}
		 * @default  `true`
		 */
		auto: true,

		/**
		 * Details control. If given as a string value, the `type` property of the
		 * default object is set to that value, and the defaults used for the rest
		 * of the object - this is for ease of implementation.
		 *
		 * The object consists of the following properties:
		 *
		 * * `display` - A function that is used to show and hide the hidden details
		 * * `renderer` - function that is called for display of the child row data.
		 *   The default function will show the data from the hidden columns
		 * * `target` - Used as the selector for what objects to attach the child
		 *   open / close to
		 * * `type` - `false` to disable the details display, `inline` or `column`
		 *   for the two control types
		 *
		 * @type {Object|string}
		 */
		details: {
			display: Editable.display.childRow,

			renderer: Editable.renderer.horizontalForm(),

			target: 2,

			type: 'inline'
		},

		/**
		 * Orthogonal data request option. This is used to define the data type
		 * requested when Responsive gets the data to show in the child row.
		 *
		 * @type {String}
		 */
		orthogonal: 'display'
	};


	/*
	 * API
	 */
	var Api = $.fn.dataTable.Api;

	// Doesn't do anything - work around for a bug in DT... Not documented
	Api.register('editable()', function () {
		return this;
	});

	Api.register('editable.index()', function (li) {
		li = $(li);

		return {
			column: li.data('dtr-index'),
			row: li.parent().data('dtr-index')
		};
	});

	Api.register('editable.rebuild()', function () {
		return this.iterator('table', function (ctx) {
			if (ctx._editable) {
				ctx._editable._classLogic();
			}
		});
	});




	/**
	 * Version information
	 *
	 * @name Editable.version
	 * @static
	 */
	Editable.version = '0.0.1-dev';

	$.fn.dataTable.Editable = Editable;
	$.fn.DataTable.Editable = Editable;

	// Attach a listener to the document which listens for DataTables initialisation
	// events so we can automatically initialise
	$(document).on('preInit.dt.dtr', function (e, settings, json) {
		if (e.namespace !== 'dt') {
			return;
		}

		if ($(settings.nTable).hasClass('editable') ||
			$(settings.nTable).hasClass('dt-editable') ||
			settings.oInit.editable ||
			DataTable.defaults.editable
		) {
			var init = settings.oInit.editable;

			if (init !== false) {
				new Editable(settings, $.isPlainObject(init) ? init : {});
			}
		}
	});


	return Editable;
}));