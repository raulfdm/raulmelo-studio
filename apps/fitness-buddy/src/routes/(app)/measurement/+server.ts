import { getMeasurements } from '$lib/infrastructure/models/getMeasurements';

export async function GET() {
	const a = await getMeasurements();
	const response = `const measurements = ${JSON.stringify(a, null, 2)};
document.querySelector("input#peitoral").value = measurements.chest;
document.querySelector("input#biceps_esquerdo").value = measurements.biceps_left;
document.querySelector("input#antebraco_esquerdo").value = measurements.forearm_left;
document.querySelector("input#abdomen").value = measurements.abdomen;
document.querySelector("input#gluteos").value = measurements.glute;
document.querySelector("input#coxa_esquerda").value = measurements.thigh_left;
document.querySelector("input#panturrilha_esquerda").value = measurements.calf_left;
document.querySelector("input#ombro").value = measurements.shoulders;
document.querySelector("input#biceps_direito").value = measurements.biceps_right;
document.querySelector("input#antebraco_direito").value = measurements.forearm_right;
document.querySelector("input#coxa_direita").value = measurements.thigh_right;
document.querySelector("input#panturrilha_direita").value = measurements.calf_right;
document.querySelector("input#peso").value = measurements.weight;`;
	return new Response(response);
}
