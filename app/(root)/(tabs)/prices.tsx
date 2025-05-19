import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

const fakeCartItems = [
  {
    id: "1",
    name: "Cappuccino",
    price: 4.5,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1587731646690-cf5f5e6fdf1e",
  },
  {
    id: "2",
    name: "Iced Latte",
    price: 5.0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1605478031387-cc847d98e1c3",
  },
];

export default function CartPage() {
  const total = fakeCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={fakeCartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity style={styles.quantityButton}><Text style={styles.quantityText}>-</Text></TouchableOpacity>
                <Text style={styles.quantityNumber}>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton}><Text style={styles.quantityText}>+</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e", // dark base
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: "#d2b48c", // light brown
    fontWeight: "bold",
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#2b2b2b",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 14,
    color: "#b3926b",
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#3a3a3a",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quantityText: {
    color: "#fff",
    fontSize: 18,
  },
  quantityNumber: {
    marginHorizontal: 8,
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 16,
  },
  total: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: "#b8926d",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#1e1e1e",
    fontWeight: "bold",
    fontSize: 16,
  },
});
