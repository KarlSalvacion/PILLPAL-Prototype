export interface Symptom {
  id: string;
  name: string;
  treatment: string;
  color: string;
}

export const allSymptoms: Symptom[] = [
  {
    id: '1',
    name: 'Headache',
    treatment: 'Rest and hydration',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'Fever',
    treatment: 'Rest and medication',
    color: '#4ECDC4',
  },
  {
    id: '3',
    name: 'Cough',
    treatment: 'Stay hydrated and rest',
    color: '#45B7D1',
  },
  {
    id: '4',
    name: 'Sore Throat',
    treatment: 'Gargle with warm salt water',
    color: '#96CEB4',
  },
  {
    id: '5',
    name: 'Fatigue',
    treatment: 'Get adequate rest',
    color: '#FFEEAD',
  },
]; 