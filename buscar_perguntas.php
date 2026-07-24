<?php 
require_once 'conexao.php';

function buscaPerguntasPorNivel($pdo, $nivel) { 

$stmt = $pdo->prepare("SELECT * FROM perguntas WHERE nivel = :nivel ORDER BY RAND() LIMIT 5");
$stmt->execute(['nivel' => $nivel]);
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($resultado as $indice => $questao) {
$alternativasDecodificadas = json_decode($questao["alternativas"], true);
$resultado[$indice]["alternativas"] = $alternativasDecodificadas;
}

return $resultado;
}

$perguntasFund = buscaPerguntasPorNivel($pdo, 'fundamental');
$perguntasMed = buscaPerguntasPorNivel($pdo, 'medio');
$perguntasSup = buscaPerguntasPorNivel($pdo, 'superior');
$todasPerguntas = array_merge($perguntasFund, $perguntasMed, $perguntasSup);

var_dump($perguntasFund,"\n", $perguntasMed,"\n", $perguntasSup);
?>