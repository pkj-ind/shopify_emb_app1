import React from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
//Functional component
import { useState } from "react";
//store data in local storage
import store from "store-js";
import ProductList from "../components/ProductList"

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Index = () => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");
  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    console.log(resources);
    setModal({ open: false });
    store.set("ids", idsFromResources);
    console.log("Product ids from local store", store.get("ids"));
  };
  return (
    <Page>
      {emptyState ? 
      <Layout>
        <EmptyState
          heading="Manage your inventory transfers"
          action={{
            content: "Select products",
            onAction: () => setModal({ open: true }),
          }}
          image={img}
        >
          <p>Select Product</p>
        </EmptyState>
      </Layout>
      : 
      <ProductList />
      }
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setModal({ open: false })}
        selectMultiple={5}
        // initialSelectionIds={selctedProduct}
      />
    </Page>
  );
};

export default Index;
