import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saldo, setSaldo] = useState(100000);
  const [monto, setMonto] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [movimientos, setMovimientos] = useState([]);

  const handleLogin = () => {
    if (username === "usuario" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const realizarTransferencia = () => {
    const montoNum = parseFloat(monto);
    if (montoNum > 0 && montoNum <= saldo && cuenta) {
      setSaldo(saldo - montoNum);
      setMovimientos([...movimientos, { id: Date.now(), cuenta, monto: montoNum }]);
      setMonto("");
      setCuenta("");
    } else {
      alert("Monto inválido o saldo insuficiente.");
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Ingresar" onPress={handleLogin} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.saldo}>Saldo: ${saldo.toFixed(2)}</Text>
      <Text style={styles.card}>Tarjeta: **** **** **** 1234</Text>
      <TextInput
        style={styles.input}
        placeholder="Cuenta destinatario"
        value={cuenta}
        onChangeText={setCuenta}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto a transferir"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <Button title="Transferir" onPress={realizarTransferencia} />
      <Text style={styles.title}>Historial de movimientos:</Text>
      <FlatList
        data={movimientos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.movimiento}>Transferido ${item.monto} a {item.cuenta}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  saldo: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  card: { fontSize: 18, marginBottom: 10, fontWeight: "bold", color: "#555" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  movimiento: { fontSize: 16, marginTop: 5 }
});
