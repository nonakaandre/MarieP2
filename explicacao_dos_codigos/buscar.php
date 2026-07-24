<?php 


$stmt = $pdo->prepare("SELECT * FROM perguntas WHERE nivel = :nivel ORDER BY RAND() LIMIT 5");
$stmt->execute(['nivel' => 'fundamental']);
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

/* fetchAll() pega todas as linhas retornadas (nesse caso, as 5 perguntas sorteadas) e devolve como um array de arrays. 
PDO::FETCH_ASSOC é o "modo" de como cada linha vai ser representada — nesse caso, como um array associativo, onde cada chave é o nome da coluna (id, nivel, pergunta, etc.) e o valor é o dado daquela linha. Por isso você conseguia acessar $questao["alternativas"] depois — porque "alternativas" é literalmente o nome da coluna no banco.
*/


foreach ($resultado as $indice => $questao) {
    /* Isso percorre $resultado pergunta por pergunta. Em cada volta do laço:

- $indice recebe a posição daquela pergunta na lista (0, depois 1, depois 2...)
- $questao recebe o conteúdo inteiro daquela pergunta (o array associativo com todas as colunas).
Pense assim: é como se você tivesse uma pilha de 5 fichas (as perguntas), e o foreach te entrega uma ficha de cada vez, junto com o número dela na pilha.*/

$alternativasDecodificadas = json_decode($questao["alternativas"], true);
/* Aqui, $questao["alternativas"] pega só a coluna alternativas daquela pergunta específica que está sendo processada naquela volta do laço — que, lembrando, veio do banco como uma string de texto ("[90, 95, 30, 85]"), não como array de verdade.

json_decode(..., true) converte esse texto pra uma estrutura de dados real do PHP — nesse caso, um array simples [90, 95, 30, 85], com números de verdade, não mais texto. */

$resultado[$indice]["alternativas"] = $alternativasDecodificadas;
}
/* $questao, dentro do foreach, é uma cópia temporária daquela pergunta — ela existe só durante aquela volta do laço, e mudar ela não afeta o array original $resultado. É como se você tivesse tirado uma ficha da pilha, rabiscado uma anotação nela, mas nunca devolvido ela pro lugar — a pilha original continua intacta, sem a sua anotação.

Por isso, é preciso acessar diretamente a posição dentro do array original: $resultado[$indice] te dá acesso à pergunta de verdade, na posição exata de onde ela veio ($indice é 0, 1, 2... exatamente a posição que aquela pergunta ocupa dentro de $resultado). Ao fazer $resultado[$indice]["alternativas"] = ..., você está mudando a pergunta original, não uma cópia.*/

var_dump($resultado);
?>