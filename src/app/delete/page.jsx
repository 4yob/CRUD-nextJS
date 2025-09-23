"use client";
import { useState } from "react";
import axios from "axios";

export default function DeletePage() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts/${commentId}`
            );
            setComment(response.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            await axios.delete(
                `https://jsonplaceholder.typicode.com/posts/${commentId}`
            );
            setSuccess(true);
            setComment(null);
            setCommentId("");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Deletar Comentário</h1>

            <div>
                <input
                    type="number"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                    placeholder="ID do comentário"
                />
                <button onClick={buscarComentario} disabled={!commentId || loading}>
                    {loading ? "Buscando..." : "Buscar Comentário"}
                </button>
            </div>

            {comment && (
                <div>
                    <h2>Comentário Encontrado: {comment.id}</h2>
                    <p>Nome: {comment.name}</p>
                    <p>Email: {comment.email}</p>
                    <p>Comentário: {comment.body}</p>

                    <button onClick={deletarComentario} disabled={loading}>
                        {loading ? "Deletando..." : "Deletar Comentário"}
                    </button>
                </div>
            )}

            {error && <p style={{ color: "red" }}>Erro na operação de deletar comentário. Tente novamente</p>}
            {success && <p style={{ color: "green" }}>Comentário deletado com sucesso!</p>}

        </div>
    );
}