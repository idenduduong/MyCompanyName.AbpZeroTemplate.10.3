(function ($) {
    app.modals.AssignDataToEmployeeModal = function () {
        var _assignDataService = abp.services.app.customerDatas;
        var _$assignDataByAreaForm = null;
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() === "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$assignDataByAreaForm = _modalManager.getModal().find('form[name=AssignDataByAreaForm]');
            _$assignDataByAreaForm.validate();
        };

        $("[name=Organization]").select2({
            width: "100%",
            allowClear: true,
            placeholder: "Chọn đơn vị",
        });
        $("#Employee").select2({
            width: "100%",
            height: '34px',
            //multiple: true,
            //tags: true,
            allowClear: true,
            placeholder: "Tìm kiếm đối tượng",
            ajax: {
                url: '/api/services/app/commonLookup/getAllSalesForLookupTableByOrganization',
                dataType: 'json',
                //delay: 1000,
                data: function (params) {
                    
                    var organizationId = $("[name=Organization]").select2("val");
                    var query = {
                        organizationId: organizationId,
                        filter: params.term,
                        skipCount: (params.page - 1 || 0) * 15,
                        maxResultCount: 15
                    }

                    // Query parameters will be ?search=[term]&type=public
                    return query;
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    var select2Data = $.map(data.result.items, function (val, i) {
                        return {
                            id: val.id,
                            text: val.maNhanVien + " - " + val.tenNhanVien
                        }
                    });
                    
                    return {
                        results: select2Data,
                        pagination: {
                            more: (params.page * 15) < data.result.totalCount
                        }
                    };
                }
            },
        });
        $('#AssignDataButton').click(function (e) {
            e.preventDefault();
            if (!_$assignDataByAreaForm.valid()) {
                return;
            }
            debugger;
            var rows_selected = $('#CustomerDatasTable').DataTable().column(0).checkboxes.selected().toArray();
            var selectAll = !($('.dt-checkboxes-select-all input').get(0).indeterminate);
            var data = {
                dataType: $('#DataTypeFilter').val(),
                authorizedOrganizationFilter: $('#AuthorizedOrganizationFilter').val(),
                authorizedEmployeeFilter: $('#AuthorizedEmployeeFilter').val(),
                dataCreatedMethod: $('#DataCreatedMethod').val(),
                primaryPhoneFilter: $('#PrimaryPhoneFilter').val(),
                nameFilter: $('#NameFilter').val(),
                createdToDayFilter: $('#CreatedToDayFilter').val(),
                createdFromDayFilter: $('#CreatedFromDayFilter').val(),
                statusFilter: $('[name=DataStatusFilter]').val(),
                dataSourceFilter: $('[name=DataSourceFilter]').val(),
                inRepository: $('[name=InRepository]').prop('checked'),
                selectedAll: selectAll,
                selectedItems: rows_selected
            };
            data.employeeId = $('[name=Employee]').val();
            data.organizationId = $('[name=Organization]').val();
            _modalManager.setBusy(true);
            _assignDataService.assignDataToEmployee(
                data
            ).done(function () {
                abp.notify.info(app.localize('AssignSuccessfully'));
                //_modalManager.close();
                //abp.event.trigger('app.createOrEditCustomerDataModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        })
    }
})(jQuery)