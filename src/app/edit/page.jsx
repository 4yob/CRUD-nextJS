"use client";

import { useState } from "react";
import axios from "axios";

export default function Update() {
    const [commentId, setCommentId] = useState("");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setForm({ name: data.name, email: data.email, body: data.body });
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const editarComentario = async () => {
        setLoading(true);
        try {
            await axios.put(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`,
                form
            );
            setSuccess(true);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Editar Comentário</h1>

            <div>
                <input
                    type="number"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                    placeholder="ID do Comentário"
                />
                <button onClick={buscarComentario} disabled={loading || !commentId}>
                    {loading ? "Buscando..." : "Buscar Comentário"}
                </button>
            </div>
            {form.name && (
                <div>
                    <h2>Editar Detalhes do Comentário</h2>

                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Edite o nome"
                    />
                    <br />
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Edite o email"
                    />
                    <br />
                    <textarea
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        placeholder="Edite o comentário"
                        rows="3"                                                          
                    />
                    <br />
                    <button onClick={editarComentario} disabled={loading}>
                        {loading ? "Editando..." : "Editar Comentário"}
                    </button>
                </div>
            )}

            {error && <p style={{ color: "red" }}>Ocorreu um erro. Tente novamente.</p>}
            {success && <p style={{ color: "green" }}>Comentário editado com sucesso!</p>}
        </div>
    );
}
