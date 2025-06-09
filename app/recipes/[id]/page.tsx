import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Mock recipe data
const recipes = [
  {
    id: '1',
    title: 'Traditional Mango Pickle',
    description: 'Learn the authentic Malda-style mango pickle recipe passed down through generations.',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookTime: '45 mins',
    servings: '8-10',
    difficulty: 'Medium',
    ingredients: [
      '2 kg raw mangoes',
      '200g mustard oil',
      '100g mustard seeds',
      '50g fenugreek seeds',
      '100g red chili powder',
      '50g turmeric powder',
      'Salt to taste'
    ],
    instructions: [
      'Wash and dry the mangoes completely',
      'Cut mangoes into small pieces',
      'Mix with salt and let it rest for 2 hours',
      'Heat mustard oil until smoking',
      'Add mustard seeds and fenugreek seeds',
      'Mix all spices and add to the mangoes',
      'Store in airtight jars'
    ]
  },
  {
    id: '2',
    title: 'Quick Garlic Pickle',
    description: 'A fast and flavorful garlic pickle perfect for boosting immunity.',
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
    cookTime: '20 mins',
    servings: '6-8',
    difficulty: 'Easy',
    ingredients: [
      '500g garlic cloves',
      '100ml mustard oil',
      '2 tbsp mustard seeds',
      '1 tbsp red chili powder',
      '1 tsp turmeric',
      'Salt to taste'
    ],
    instructions: [
      'Peel and clean garlic cloves',
      'Heat oil and add mustard seeds',
      'Add garlic and sauté lightly',
      'Mix in all spices',
      'Cool and store in jars'
    ]
  }
];

async function getRecipe(id: string) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return recipes.find(recipe => recipe.id === id);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const recipe = await getRecipe(params.id);
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found | Shahi Pickle',
    };
  }

  return {
    title: `${recipe.title} Recipe | Shahi Pickle`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-muted-foreground mb-8">{recipe.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full rounded-lg mb-6"
              />
              
              <div className="bg-cream dark:bg-card p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Recipe Info</h3>
                <div className="space-y-2">
                  <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
                  <p><strong>Servings:</strong> {recipe.servings}</p>
                  <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Ingredients</h3>
              <ul className="list-disc list-inside space-y-2 mb-8">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              
              <h3 className="font-semibold text-lg mb-4">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}