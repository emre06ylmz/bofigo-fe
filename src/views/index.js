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
    name: "Tedarikçi Listesi",
    path: "/pages/supplier",
    component: SupplierPage
  },
  {
    name: "Satın Alma Listesi",
    path: "/pages/purchase",
    component: PurchasePage
  },
  {
    name: "Ürün Listesi",
    path: "/pages/product",
    component: ProductPage
  },
  {
    name: "Ürün Kategori Listesi",
    path: "/pages/productcategory",
    component: ProductCategoryPage
  },
  {
    name: "Ürün Model Kodu Listesi",
    path: "/pages/productmodelcode",
    component: ProductModelCodePage
  },
  {
    name: "Üretiim Listesi",
    path: "/pages/production",
    component: ProductionPage
  },
  {
    name: "Sevkiyat Listesi",
    path: "/pages/delivery",
    component: DeliveryPage
  },
  {
    name: "Üyeler",
    path: "/pages/users/users",
    component: UserPage
  },
  {
    name: "Üye Tipleri",
    path: "/pages/users/usertypes",
    component: UserTypePage
  },
  {
    name: "Menüler",
    path: "/pages/settings/menus",
    component: MenuPage
  },
  {
    name: "Döviz Ayarları",
    path: "/pages/settings/currency",
    component: CurrencySettings
  },
  {
    name: "Birim Ayarları",
    path: "/pages/unit",
    component: UnitPage
  },
  {
    name: "Email Ayarları",
    path: "/pages/settings/email",
    component: EmailSettings
  },
  {
    name: "Iyzico Ayarları",
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
