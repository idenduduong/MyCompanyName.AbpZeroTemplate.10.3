(function () {
    $(function () {

        var _$releasesTable = $('#ReleasesTable');
        var _releasesService = abp.services.app.releases;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Releases.Create'),
            edit: abp.auth.hasPermission('Pages.Releases.Edit'),
            'delete': abp.auth.hasPermission('Pages.Releases.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Releases/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Releases/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditReleaseModal',
            width: '60%'
        });

        var _standardizeDataModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Releases/StandardizeDataModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Releases/_StandardizeDataModal.js',
            modalClass: 'StandardizeDataModal',
            width: '60%'
        });

        var _viewReleaseModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Releases/ViewreleaseModal',
            modalClass: 'ViewReleaseModal'
        });




        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }

        var dataTable = _$releasesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _releasesService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#ReleasesTableFilter').val(),
                        minAmountFilter: $('#MinAmountFilterId').val(),
                        maxAmountFilter: $('#MaxAmountFilterId').val(),
                        hasReleaseFeeFilter: $('#HasReleaseFeeFilterId').val(),
                        releaseTypeFilter: $('#ReleaseTypeFilterId').val(),
                        minReleaseFeeFilter: $('#MinReleaseFeeFilterId').val(),
                        maxReleaseFeeFilter: $('#MaxReleaseFeeFilterId').val(),
                        noteFilter: $('#NoteFilterId').val(),
                        releaseReasonFilter: $('#ReleaseReasonFilterId').val(),
                        feeInPercentageFilter: $('#FeeInPercentageFilterId').val(),
                        approvementStatusFilter: $('#ApprovementStatusFilterId').val(),
                        processedByUserFilter: $('#ProcessedByUserFilterId').val(),
                        processReasonFilter: $('#ProcessReasonFilterId').val(),
                        theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
                        theKhachHangMaThe2Filter: $('#TheKhachHangMaThe2FilterId').val(),
                        theKhachHangChiTietServiceNameFilter: $('#TheKhachHangChiTietServiceNameFilterId').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                        dM_DoiTuongTenDoiTuong2Filter: $('#DM_DoiTuongTenDoiTuong2FilterId').val(),
                        userNameFilter: $('#UserNameFilterId').val()
                    };
                }
            },
            columnDefs: [
                {
                    width: 120,
                    targets: 0,
                    data: null,
                    orderable: false,
                    autoWidth: false,
                    defaultContent: '',
                    rowAction: {
                        cssClass: 'btn btn-brand dropdown-toggle',
                        text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                        items: [
                            {
                                text: app.localize('View'),
                                action: function (data) {
                                    _viewReleaseModal.open({ id: data.record.release.id });
                                }
                            },
                            {
                                text: app.localize('Edit'),
                                visible: function () {
                                    return _permissions.edit;
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ id: data.record.release.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deleteRelease(data.record.release);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "release.amount",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                //{
                //    targets: 2,
                //    data: "release.hasReleaseFee",
                //    render: function (hasReleaseFee) {
                //        if (hasReleaseFee) {
                //            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                //        }
                //        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                //    }

                //},
                {
                    targets: 2,
                    data: "release.releaseType",
                    render: function (releaseType) {
                        return app.localize('Enum_ReleaseTypeEnum_' + releaseType);
                    }

                },
                //{
                //    targets: 4,
                //    data: "release.releaseFee",
                //    render: function (data) {
                //        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                //    }
                //},
                {
                    targets: 3,
                    data: "release.note"
                },
                {
                    targets: 4,
                    data: "release.releaseReason"
                },
                //{
                //    targets: 5,
                //    data: "release.feeInPercentage",
                //    render: function (feeInPercentage) {
                //        if (feeInPercentage) {
                //            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                //        }
                //        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                //    }

                //},
                //{
                //    targets: 8,
                //    data: "release.approvementStatus",
                //    render: function (approvementStatus) {
                //        return app.localize('Enum_ReleaseApprovementStatus_' + approvementStatus);
                //    }

                //},
                //{
                //    targets: 9,
                //    data: "release.processedByUser"
                //},
                //{
                //    targets: 10,
                //    data: "release.processReason"
                //},
                {
                    targets: 5,
                    data: "theKhachHangMaThe"
                },
                {
                    targets: 6,
                    data: "theKhachHangMaThe2"
                },
                {
                    targets: 7,
                    data: "theKhachHangChiTietServiceName"
                },
                {
                    targets: 8,
                    data: "dM_DoiTuongTenDoiTuong"
                },
                {
                    targets: 9,
                    data: "dM_DoiTuongTenDoiTuong2"
                },
                //{
                //    targets: 10,
                //    data: "userName"
                //}
            ]
        });


        function getReleases() {
            dataTable.ajax.reload();
        }

        function deleteRelease(release) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _releasesService.delete({
                            id: release.id
                        }).done(function () {
                            getReleases(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        $('#ShowAdvancedFiltersSpan').click(function () {
            $('#ShowAdvancedFiltersSpan').hide();
            $('#HideAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideDown();
        });

        $('#HideAdvancedFiltersSpan').click(function () {
            $('#HideAdvancedFiltersSpan').hide();
            $('#ShowAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideUp();
        });

        $('#CreateNewReleaseButton').click(function () {
            _createOrEditModal.open();
        });

        $('#StandardizeDataButton').click(function () {
            _standardizeDataModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _releasesService
                .getReleasesToExcel({
                    filter: $('#ReleasesTableFilter').val(),
                    minAmountFilter: $('#MinAmountFilterId').val(),
                    maxAmountFilter: $('#MaxAmountFilterId').val(),
                    hasReleaseFeeFilter: $('#HasReleaseFeeFilterId').val(),
                    releaseTypeFilter: $('#ReleaseTypeFilterId').val(),
                    minReleaseFeeFilter: $('#MinReleaseFeeFilterId').val(),
                    maxReleaseFeeFilter: $('#MaxReleaseFeeFilterId').val(),
                    noteFilter: $('#NoteFilterId').val(),
                    releaseReasonFilter: $('#ReleaseReasonFilterId').val(),
                    feeInPercentageFilter: $('#FeeInPercentageFilterId').val(),
                    approvementStatusFilter: $('#ApprovementStatusFilterId').val(),
                    processedByUserFilter: $('#ProcessedByUserFilterId').val(),
                    processReasonFilter: $('#ProcessReasonFilterId').val(),
                    theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
                    theKhachHangMaThe2Filter: $('#TheKhachHangMaThe2FilterId').val(),
                    theKhachHangChiTietServiceNameFilter: $('#TheKhachHangChiTietServiceNameFilterId').val(),
                    dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                    dM_DoiTuongTenDoiTuong2Filter: $('#DM_DoiTuongTenDoiTuong2FilterId').val(),
                    userNameFilter: $('#UserNameFilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditReleaseModalSaved', function () {
            getReleases();
        });

        $('#GetReleasesButton').click(function (e) {
            e.preventDefault();
            getReleases();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getReleases();
            }
        });

    });
})();