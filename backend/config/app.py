import streamlit as st
from pages import home, product, cart, seller_dashboard

st.set_page_config(page_title="E-Commerce App", layout="wide")

# Sidebar navigation
page = st.sidebar.selectbox("Navigate", ["Home", "Product Details", "Cart", "Seller Dashboard"])

# Render selected page
if page == "Home":
    home.show_home()
elif page == "Product Details":
    product.show_product()
elif page == "Cart":
    cart.show_cart()
elif page == "Seller Dashboard":
    seller_dashboard.show_seller_dashboard()
