"use client";

import { useState } from "react";
import axios from "axios";

export default function PostPage() {
    const [loading, setLoading] = useState(false);
    const [addComment, setAddComment] = useState([]);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        body: "",
    });

    const criarNovoComentario = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments", {
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.body.trim(),
            });

            setAddComment([response.data, ...addComment]);
            setForm({ name: "", email: "", body: "" });
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao criar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div>
            <h1>Criar Comentário</h1>

            <div>
                <input 
                    type="text"
                    name="name"
                    placeholder="Digite seu nome."
                    value={form.name}
                    onChange={atualizarForm}
                    required
                />

                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email."
                    value={form.email}
                    onChange={atualizarForm}
                />

                <br />

                <textarea
                    name="body"
                    placeholder="Digite seu comentário."
                    value={form.body}
                    onChange={atualizarForm}
                    rows={4}
                />

                <br />

                <button onClick={criarNovoComentario} disabled={!form.name.trim() || loading}>
                    {loading ? "Salvando..." : "Salvar Comentário"}
                </button>
            </div>

            {error && <p style={{ color: "red" }}>❌ Erro ao criar comentário</p>}

            <h2>Comentários ({addComment.length})</h2>
            <ul>
                {addComment.map((comment) => (
                    <li key={comment.id}>
                        <hr />
                        <p>{comment.name}</p>
                        <p>{comment.email}</p>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}