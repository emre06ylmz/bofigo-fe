//SOLMENU soldaki menüyü buradan ayarlıyoruz
export default {
  top: [
    {
      name: "Ana Sayfa",
      url: "/home",
      icon: "Home",
    },
    {
      name: "Hammadde Yönetimi",
      icon: "Layers",
      children: [
        {
          name: "Hammadde Kategori Listesi",
          url: "/pages/rawmaterial/category",
        },
        {
          name: "Hammadde Listesi",
          url: "/pages/rawmaterial",
        },
        {
          name: "Tedarikçi Listesi",
          url: "/pages/supplier",
        },
      ],
    },
    {
      name: "Ürün Yönetimi",
      icon: "Layers",
      children: [
        {
          name: "Ürün Listesi",
          url: "/pages/product",
        },
        {
          name: "Ürün Kategori Listesi",
          url: "/pages/productcategory",
        },
        {
          name: "Ürün Model Kodu Listesi",
          url: "/pages/productmodelcode",
        }
      ],
    },
    {
      name: "Kullanıcılar",
      icon: "Layers",
      children: [
        {
          name: "Üyeler",
          url: "/pages/users/users",
        },
        {
          name: "Üye Tipleri",
          url: "/pages/users/usertypes",
        },
      ],
    },
    {
      name: "Ayarlar",
      icon: "Layers",
      children: [
        {
          name: "Birim Listesi",
          url: "/pages/unit",
        },
        {
          name: "Döviz Ayaları",
          url: "/pages/settings/currency",
        },
      ],
    },
    {
      divider: true,
    },
    {
      name: "Rapor",
      url: "/widgets",
      icon: "Package",
      badge: {
        text: "NEW",
      },
    },
  ],
  bottom: [   
    {
      name: "Account",
      url: "/account",
      icon: "User",
      badge: {
        variant: "success",
        //text: "3",
      },
    },
  ],
};
