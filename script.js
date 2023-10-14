fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector('#table-body');
    const tombolTampilkanSemuaData = document.querySelector('#tampil_data_semua');
    const tombolSortTahun = document.querySelector('#sort-tahun');
    const tombolSortJenis = document.querySelector('#sort-jenis');
    const tombolSortHasil = document.querySelector('#sort-hasil');
    const tombolSortButtons = document.querySelectorAll('.btn-sort');
    let isDataVisible = false;
    let sortOrders = {
      tahun: 'asc',
      jenis: 'asc',
      hasil: 'asc',
    };
    let dataToDisplay = [];

    function createTableRows(item) {
      const tr = document.createElement('tr');
      const tdIndex = document.createElement('td');
      tdIndex.textContent = rowIndex + 1;
      const tdTahun = document.createElement('td');
      tdTahun.textContent = item.tahun;
      const tdWilayah = document.createElement('td');
      tdWilayah.textContent = item.jenis;
      const tdTenagaKesehatan = document.createElement('td');
      tdTenagaKesehatan.textContent = item.hasil;
      const tdJumlah = document.createElement('td');
      tdJumlah.textContent = item.jumlah;
      tr.appendChild(tdIndex);
      tr.appendChild(tdTahun);
      tr.appendChild(tdWilayah);
      tr.appendChild(tdTenagaKesehatan);
      tr.appendChild(tdJumlah);
      return tr;
    }

    function sortData(field) {
      const sortOrder = sortOrders[field];
      dataToDisplay.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }

    function showSortButtons() {
      tombolSortButtons.forEach((button) => {
        button.style.display = 'block';
      });
    }

    function hideSortButtons() {
      tombolSortButtons.forEach((button) => {
        button.style = 'none';
      });
    }

    function resetData() {
      tableBody.innerHTML = '';
      rowIndex = 0;
      tombolTampilkanSemuaData.innerHTML = 'Tampilkan Semua Data';
      isDataVisible = false;
      hideSortButtons();
      dataToDisplay = [...data.dataPanen];
    }

    tombolTampilkanSemuaData.addEventListener('click', function () {
      if (isDataVisible) {
        resetData();
      } else {
        if (dataToDisplay.length === 0) {
          dataToDisplay = [...data.dataPanen];
        }
        tableBody.innerHTML = '';
        rowIndex = 0;
        dataToDisplay.forEach((item) => {
          const tableRows = createTableRows(item);
          tableBody.appendChild(tableRows);
          rowIndex++;
        }); 
        
        tombolTampilkanSemuaData.innerHTML = 'Reset Data';

        isDataVisible = true;
        showSortButtons();
      }
    }); 

    tombolSortTahun.addEventListener('click', function () {
      sortData('tahun');
      sortOrders.tahun = sortOrders.tahun === 'asc' ? 'desc' : 'asc';
      updateTable();
    });

    tombolSortJenis.addEventListener('click', function () {
      sortData('jenis');
      sortOrders.jenis = sortOrders.jenis === 'asc' ? 'desc' : 'asc';
      updateTable();
    });

    tombolSortHasil.addEventListener('click', function () {
      sortData('hasil');
      sortOrders.hasil = sortOrders.hasil === 'asc' ? 'desc' : 'asc';
      updateTable();
    });

    function updateTable() {
      tableBody.innerHTML = '';
      rowIndex = 0;
      dataToDisplay.forEach((item) => {
        const tableRows = createTableRows(item);
        tableBody.appendChild(tableRows);
        rowIndex++;
      });
    }
  })
  .catch((error) => console.error('Terjadi kesalahan:', error));
