({
    fetchData: function (cmp, fetchData, numberOfRecords) {
        var fakerLib = this.mockdataLibrary.getFakerLib(),
            dataPromise;

        fetchData.address = {type : function () {
            return {
                latitude : fakerLib.address.latitude(),
                longitude : fakerLib.address.longitude()
            }
        }};

        fetchData.confidence =  { type : function () {
            return Math.random();
        }};

        dataPromise = this.mockdataLibrary.lightningMockDataFaker(fetchData, numberOfRecords);


        dataPromise.then($A.getCallback(function (results) {
            cmp.set('v.data', results);
            cmp.set('v.rowKeys', this.getKeysFromData(results));
        }).bind(this));


    },

    getKeysFromData: function (data) {
        return data.map(function (row, index) {
            return {
                value: row.id,
                label: '#' +  (parseInt(index) + 1) + ' - ' + row.id,
            };
        });
    }
})