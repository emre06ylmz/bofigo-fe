import React, { useEffect, useState } from "react";
import { Tree, Modal, message, Button } from "antd";
import MenuForm from "./MenuForm";
import callApi from "../../../utils/callApi";
import MenuUpdateForm from "./MenuUpdateForm";
import { Table } from 'antd';

const { DirectoryTree } = Tree;

export default function MenuMage() {
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    title: "demo",
    type: ""
  });


  const columns = [
    {
      title: "Id",
      dataIndex: "id"
    },

    {
      title: "Name",
      dataIndex: "name"
    },

    {
      title: "Detail",
      dataIndex: "detail"
    },

    {
      title: "Route",
      dataIndex: "route"
    }
  ];


  const [menuItems, setMenuItems] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [mainMenuList, setMainMenuList] = useState([]);
  
  useEffect(() => {
    getMenuItems();
  }, []);

  async function getMenuItems() {
    try {
      let response = await callApi({
        endpoint: "/api/menus/all",
        method: "GET"
      });
      if (response) {

        setItems(response);
        setMainMenuList(response);
        var allMenu = [];
        for(var i = 0;i< response.length;i++){
            var menu = response[i];
            var childrens = [];

            for(var j = 0;j< menu.childs.length;j++){
                var children = menu.childs[j];
                var item =  { title: children.name, key: children.id, url: children.route, isLeaf: true, data: children, parentId: menu.id};
                childrens.push(item);
            }

            var menuItem = {
                title: menu.name,
                key: menu.id,
                url: menu.route,
                children: childrens,
                data: menu
              }

              allMenu.push(menuItem)
          }

          setMenuItems(allMenu);
       }
        
    } catch (error) {
      message.error(error.toString());
    }
  }

  const onSelect = (keys, event) => {
    setSelectedData(event.node.data)
    setModalInfo({ visible: true, type: "UPDATE" });
  };

  const onExpand = () => {
    console.log("Trigger Expand");
  };

  function hideModal(e) {
    setModalInfo({ visible: false });
    getMenuItems();
  }

  function onMenuItemAdd() {
    setModalInfo({ visible: true, type: "POST" });
  }

  return (
    <React.Fragment>
      <Button type="primary" onClick={onMenuItemAdd}>
        Menü Ekle
      </Button>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={menuItems}
      />
      {modalInfo.type === "POST" && (
        <Modal
          title="Menü Ekleme Ekranı"
          visible={modalInfo.visible}
          onCancel={hideModal}
        >
          <MenuForm handleClose={hideModal} mainMenuList={mainMenuList}/>
          )}
        </Modal>
      )}

      {modalInfo.type === "UPDATE" && (
        <Modal
          title="Menü Güncelleme Ekranı"
          visible={modalInfo.visible}
          onCancel={hideModal}
        >
          <MenuUpdateForm handleClose={hideModal} data={selectedData} mainMenuList={mainMenuList} />
          )}
        </Modal>
      )}

        <Table
          //loading={isLoading}
          dataSource={items}
          columns={columns}
        />  
    </React.Fragment>
  );
}
