<!--
  melakukan: 'doing',
  merubah: 'moving',
  menambah: 'adding',
  membperbarui: 'updating',
  assign: 'assigning',
  other: 'other'
 -->
<script setup>
const data = [{
  id: '1',
  status: 'moving',
  label: 'merubah',
  from: 'Puput Aprilia Eka Putri',
  imgFrom: 'https://via.placeholder.com/22x30',
  to: 'Status Tiket',
  desc: {
    from: {
      id: '1',
      name: 'In progress',
      color: 'bg-green-500'
    },
    to: {
      id: '1',
      name: 'In progress',
      color: 'bg-green-500'
    }
  },
  date: '2023-07-31 13:00'
}, {
  id: '2',
  status: 'doing',
  label: 'melakukan',
  from: 'Puput Aprilia Eka Putri',
  imgFrom: 'https://via.placeholder.com/22x30',
  to: 'Status Tiket',
  desc: 'Ini uraian penyelesaian masalah yang ditulis CS',
  date: '2023-07-31 13:00'
}, {
  id: '3',
  status: 'adding',
  label: 'menambahkan',
  from: 'Puput Aprilia Eka Putri',
  imgFrom: 'https://via.placeholder.com/22x30',
  to: 'Status Tiket',
  desc: 'Ini uraian penyelesaian masalah yang ditulis CS',
  children: [{
    from: 'Bella Arta Mei Via',
    desc: 'Balasan orang lain Balasan orang lain',
    date: '2023-07-31 13:00'
  }],
  date: '2023-07-31 13:00'
}, {
  id: '4',
  status: 'doing',
  label: 'melakukan',
  from: 'Puput Aprilia Eka Putri',
  imgFrom: 'https://via.placeholder.com/22x30',
  to: 'Status Tiket',
  desc: 'Ini uraian penyelesaian masalah yang ditulis CS',
  children: [],
  date: '2023-07-31 13:00'
}, {
  id: '6',
  status: 'updating',
  label: 'memperbarui',
  from: 'Puput Aprilia Eka Putri',
  imgFrom: 'https://via.placeholder.com/22x30',
  to: 'Konfirmasi Tiket',
  desc: {
    from: {
      id: '1',
      name: 'Tidak ada'
    },
    to: {
      id: '1',
      name: 'Layanan Perizinan '
    }
  },
  date: '2023-07-31 13:00'
}, {
  id: '7',
  status: 'other',
  label: 'membuat tiket di layanan',
  from: 'Pengadu',
  imgFrom: 'https://via.placeholder.com/22x30',
  to: 'perizinan usaha',
  date: '2023-07-31 13:00'
}]
</script>

<template>
  <div v-for="(item, index) in data" :key="index" class=" w-full h-full">
    <div class="w-full h-full mb-4" style=" flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
      <div style="align-self: stretch; background: white; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
        <div style="background: white; border-radius: 72px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
          <div style="width: 32px; height: 32px; position: relative">
            <div style="width: 32px; height: 32px; left: 0px; top: 0px; position: absolute; background: #FAD979; border-radius: 9999px" />
            <img style="width: 21.60px; height: 29.60px; left: 5.60px; top: 2.40px; position: absolute" :src="item.imgFrom">
          </div>
        </div>
        <div style="flex: 1 1 0">
          <span class=" text-neutral-600" style="font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">{{ item.from }}</span>
          <span class=" text-neutral-400 ml-2 mr-2 " style="font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">{{ item.label }} </span>
          <span class=" text-neutral-600" style="font-size: 14px; font-family: Poppins; font-weight: 500; line-height: 25.20px; word-wrap: break-word">{{ item.to }}</span>
        </div>
        <div style="color: #8F8F8F; font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">
          1 Jam yang lalu
        </div>
      </div>
      <div v-if="item.status==='updating' || item.status==='moving'" style="padding-left: 42px; background: white; justify-content: flex-start; align-items: center; gap: 16px; display: inline-flex">
        <div v-if="item.status==='updating'" style="text-align: center; color: #B4B4B4; font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">
          {{ item.desc.from.name }}
        </div>
        <CLabelText v-if="item.status==='moving'" :text="item.desc.from.name" :color="item.desc.from.color" />
        <Icon name="grommet-icons:form-next-link" color="black" size="20" />
        <div style="justify-content: flex-start; align-items: center; gap: 8px; display: flex">
          <div v-if="item.status==='updating'" style="text-align: center; color: #444444; font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">
            {{ item.desc.to.name }}
          </div>
        </div>
        <CLabelText v-if="item.status==='moving'" :text="item.desc.to.name" :color="item.desc.to.color" />
      </div>
      <div v-if="item.status==='doing' || item.status==='adding'" class=" w-full ml-8 pr-8 mt-2">
        <div style="width: 100%; height: 100%; padding-top: 16px; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; background: #FAFAFA; border-radius: 8px; flex-direction: column; justify-content: center; align-items: flex-end; display: inline-flex">
          <div style="align-self: stretch; color: #444444; font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">
            {{ item.desc }}
          </div>
        </div>

        <div v-if="item.status==='adding' && item.children.length>0" style="width: 100%; height: 100%; padding-left: 48px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 16px; display: inline-flex">
          <div v-for="(child, indexs) in item.children" :key="indexs" style="align-self: stretch; height: 105px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
            <div style="justify-content: flex-start; align-items: flex-start; gap: 10px; display: inline-flex">
              <div style="background: white; border-radius: 56.25px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
                <div style="width: 25px; height: 25px; position: relative">
                  <div style="width: 25px; height: 25px; left: 0px; top: 0px; position: absolute; background: #FAD979; border-radius: 9999px" />
                  <img style="width: 16.88px; height: 23.13px; left: 4.38px; top: 1.87px; position: absolute" src="https://via.placeholder.com/17x23">
                </div>
              </div>
              <div style="color: #444444; font-size: 14px; font-family: Poppins; font-weight: 500; line-height: 25.20px; word-wrap: break-word">
                {{ child.from }}
              </div>
            </div>
            <div style="align-self: stretch; height: 80px; padding-left: 34px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
              <div style="align-self: stretch; height: 80px; padding-top: 8px; padding-bottom: 8px; padding-left: 16px; padding-right: 8px; background: #FAFAFA; border-radius: 8px; flex-direction: column; justify-content: center; align-items: flex-end; display: flex">
                <div style="align-self: stretch; color: #444444; font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">
                  {{ child.desc }}
                </div>
                <div style="color: #B4B4B4; font-size: 12px; font-family: Poppins; font-weight: 500; line-height: 21.60px; word-wrap: break-word">
                  10.54
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
