window.onload = () => {
  
  let items = [];
  
  const content = document.querySelector('.content');
  const inputNameItem = document.querySelector('.name-item');
  const inputPriceItem = document.querySelector('.price-item');
  const btnSubmit = document.querySelector('.btn-submit');
  btnSubmit.addEventListener('click', insertItem);
  
  function insertItem() {
    // value input
    const nameItem = inputNameItem.value.trim();
    const priceItem = inputPriceItem.value.trim();
    // validasi terlebih dahulu
    if (validate(nameItem, priceItem) == true) {
      // jadikan value input sebagai objek
      const item = {
        name: nameItem, 
        price: parseFloat(priceItem)
      };
      // masukkan isi variabel "item" kedalam variabel "items"
      items.unshift(item);
      // render element 
      const result = renderItem(item);
      // tampilkan element yang sudah dirender
      content.insertAdjacentHTML('afterbegin', result);
      // tampilkan pesan bahwa item berhasil ditambahkan
      alerts('success', 'Success', 'Item has been added!');
      // update total biaya
      updateTotalCost();
      // bersihkan value input
      clear();
    }
  }
  
  function validate(name, price) {
    // jika semua input kosong
    if (!name && !price) return alerts('errror', 'Alert', 'field\'s is empty!');
    // jika masih ada input kosong
    if (!name || !price) return alerts('errror', 'Alert', 'field is empty!');
    // jika nama item terlalu pendek
    if (name.length < 3) return alerts('error', 'Alert', 'field name must be more then 3 character!');
    // jika nama item terlalu panjang
    if (name.length > 100) return alerts('error', 'Alert', 'field name must be less then 100 character!');
    // jika field harga berisikan sebuah huruf
    if (price.match(/[a-zA-Z]/gmi)) return alerts('error', 'Alert', 'field price just only can contain numbers!');
    // jika berhasil melewati semua validasi, kembalikan nilai boolean true
    return true;
  }
  
  function alerts(icon, title, text, position = 'center') {
    // plugin sweetalert2
    swal.fire ({
      position: position, 
      icon: icon,
      title: title,
      text: text
    });
  }
  
  function clear() {
    // bersihkan value input
    inputNameItem.value = '';
    inputPriceItem.value = '';
  }
  
  function renderItem({name, price}) {
    return `
    <tr>
      <td class="p-3 fw-light">${name}</td>
      <td class="p-3 fw-light">$${price}</td>
      <td class="p-3 fw-light">
        <button class="btn btn-danger btn-sm rounded-1 btn-delete">delete</button>
      </td>
    </tr>
    `;
  }
  
  function updateTotalCost() {
    // integer
    let total = 0;
    // loop dan masukkan hasilnya kedalam variabel "total" 
    items.forEach(item => total += item.price);
    // masukkan isi variabel "total" kedalam element "priceText" 
    const priceText = document.querySelector('.price-text');
    priceText.textContent = `$${total}`;
  }
  
  // hapus data
  window.addEventListener('click', event => {
    // jika element yang ditekan memiliki class "btn-delete"
    if (event.target.classList.contains('btn-delete')) {
      // plugin sweetalert2 
      swal.fire ({
        icon: 'info',
        title: 'Are You Sure?',
        text: 'do you want to delete this data?',
        showCancelButton: true
      })
      .then(response => {
        // jika menekan tombol "ok" atau "yes"
        if (response.isConfirmed) {
          // jalankan fungsi deleteItem()
          deleteItem(event.target);
          // tampilkan pesan bahwa item berhasil dihapus
          alerts('success', 'Success', 'Item has been deleted!');
        }
      });
    }
  });
  
  function deleteItem(param) {
    // dapatkan element
    const tr = param.parentElement.parentElement;
    const nameItem = tr.children[0].textContent.toLowerCase();
    // hapus element array yang sesuai dengan index element "<tr>"
    items.splice((tr.rowIndex - 1), 1);
    // update total biaya
    updateTotalCost();
    // hapus element "<tr>"
    tr.remove();
  }
  
  // hapus semua item
  const btnDeleteAllItem = document.querySelector('.btn-all');
  btnDeleteAllItem.addEventListener('click', deleteAllItem);
  
  function deleteAllItem() {
    // plugin sweetalert2
    swal.fire ({
      icon: 'info',
      title: 'Are You Sure?',
      text: 'dou you want to delete all data?',
      showCancelButton: true
    })
    .then(response => {
      // jika menekan tombol "ok" atau "yes"
      if (response.isConfirmed) {
        // hilangkan isi dari element "content" dan isi variabel "items"
        content.innerHTML = '';
        items = [];
        // kasih pesan bahwa semua item berhasil dihapus
        alerts('success', 'Success', 'All data has been deleted!');
        // update total biaya
        updateTotalCost();
      }
    })
  }
  
}