import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import Analytics from "./pages/Analytics";
import CmsPage from "./pages/Cms";
import Widgets from "./pages/Widgets";
import BlankPage from "./pages/BlankPage";
import SubNav from "./pages/SubNav";
import Feed from "./pages/Feed";
import ErrorPage from "./pages/404";
import TestPage from "./pages/Test";
import LoginPage from "./pages/Login";

import UserPage from "./pages/users/UserPage";
import UserTypePage from "./pages/usertypes/UserTypePage";

import MenuPage from "./pages/menu/MenuPage";
import EmailSettings from "./pages/settings/EmailSettings";
import CurrencySettings from "./pages/settings/CurrencySettings";
import IyzicoSettings from "./pages/settings/IyzicoSettings";
import ProfilePage from "./pages/account/ProfilePage";

import RawMaterialCategoryPage from "./pages/rawmaterialcategory/RawMaterialCategoryPage";
import RawMaterialPage from "./pages/rawmaterial/RawMaterialPage";
import UnitPage from "./pages/unit/UnitPage";
import SupplierPage from "./pages/supplier/SupplierPage";
import PurchasePage from "./pages/purchase/PurchasePage";
import ProductCategoryPage from "./pages/productcategory/ProductCategoryPage";
import ProductModelCodePage from "./pages/productmodelcode/ProductModelCodePage";
import ProductPage from "./pages/product/ProductPage";
import ProductSalePage from "./pages/productSale/ProductSalePage";
import ProductionPage from "./pages/production/ProducionPage";
import DeliveryPage from "./pages/delivery/DeliveryPage";

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: "Account",
    path: "/account",
    component: ProfilePage
  },
  {
    name: "Dashboard",
    path: "/home",
    component: Dashboard
  },
  {
    name: "Hammadde Kategori Listesi",
    path: "/pages/rawmaterial/category",
    component: RawMaterialCategoryPage
  },
  {
    name: "Hammadde Listesi",
    path: "/pages/rawmaterial",
    component: RawMaterialPage
  },
  {
    name: "Tedarik??i Listesi",
    path: "/pages/supplier",
    component: SupplierPage
  },
  {
    name: "Sat??n Alma Listesi",
    path: "/pages/purchase",
    component: PurchasePage
  },
  {
    name: "??r??n Listesi",
    path: "/pages/product",
    component: ProductPage
  },
  {
    name: "??r??n Sat???? Listesi",
    path: "/pages/productsale",
    component: ProductSalePage
  },
  {
    name: "??r??n Kategori Listesi",
    path: "/pages/productcategory",
    component: ProductCategoryPage
  },
  {
    name: "??r??n Model Kodu Listesi",
    path: "/pages/productmodelcode",
    component: ProductModelCodePage
  },
  {
    name: "??retiim Listesi",
    path: "/pages/production",
    component: ProductionPage
  },
  {
    name: "Sevkiyat Listesi",
    path: "/pages/delivery",
    component: DeliveryPage
  },
  {
    name: "??yeler",
    path: "/pages/users/users",
    component: UserPage
  },
  {
    name: "??ye Tipleri",
    path: "/pages/users/usertypes",
    component: UserTypePage
  },
  {
    name: "Men??ler",
    path: "/pages/settings/menus",
    component: MenuPage
  },
  {
    name: "D??viz Ayarlar??",
    path: "/pages/settings/currency",
    component: CurrencySettings
  },
  {
    name: "Birim Ayarlar??",
    path: "/pages/unit",
    component: UnitPage
  },
  {
    name: "Email Ayarlar??",
    path: "/pages/settings/email",
    component: EmailSettings
  },
  {
    name: "Iyzico Ayarlar??",
    path: "/pages/settings/iyzico",
    component: IyzicoSettings
  },
  {
    name: "Blank",
    path: "/pages/blank",
    component: BlankPage
  },
  {
    name: "Sub Navigation",
    path: "/pages/subnav",
    component: SubNav
  },
  {
    name: "404",
    path: "/pages/404",
    component: ErrorPage
  },
  {
    name: "Test",
    path: "/pages/Test",
    component: TestPage
  },
  {
    name: "Login",
    path: "/pages/Login",
    component: LoginPage
  },
  {
    name: "Analytics",
    path: "/apps/analytics",
    component: Analytics
  },
  {
    name: "Activity Feed",
    path: "/apps/feed",
    component: Feed
  },
  {
    name: "Invoice",
    path: "/apps/invoice",
    component: Invoice
  },
  {
    name: "CMS",
    path: "/apps/cms",
    component: CmsPage
  },
  {
    name: "Widgets",
    path: "/widgets",
    component: Widgets
  }
];

export default pageList;
