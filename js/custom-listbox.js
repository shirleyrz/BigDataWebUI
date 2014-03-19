//Assume jobList gets populated from JSON
    var jobList = '<option>New Job Added</option>';

    $(function () {
        $('#jobs')
                .bootstrapDualListbox({
                    bootstrap2Compatible: false,
                    moveAllLabel: 'MOVE ALL',
                    removeAllLabel: 'REMOVE ALL',
                    moveSelectedLabel: 'MOVE SELECTED',
                    removeSelectedLabel: 'REMOVE SELECTED',
                    filterPlaceHolder: 'Search',
                    filterSelected: '2',
                    filterNonSelected: '1',
                    moveOnSelect: true,
                    preserveSelectionOnMove: 'moved',
                    helperSelectNamePostfix: '_myhelper',
                    selectedListLabel: 'Selected Jobs',
                    nonSelectedListLabel: 'Defined Jobsets and Jobs'
                })
                .bootstrapDualListbox('setMoveAllLabel', 'Move all teh elementz!!!')
                .bootstrapDualListbox('setRemoveAllLabel', 'Remove them all!')
                .bootstrapDualListbox('setSelectedFilter', undefined)
                .bootstrapDualListbox('setNonSelectedFilter', undefined)
                .append(jobList)
                .bootstrapDualListbox('refresh')
    });