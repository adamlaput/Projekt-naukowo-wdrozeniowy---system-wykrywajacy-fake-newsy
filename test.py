import unittest 
import backend.preprocessing as pp

class TestPreprocessing(unittest.TestCase):

	def test_clear_text(self):
		self.assertEqual(pp.clear_text('-This". Is, mAdness!!@'), 'this is madness')
		self.assertEqual(pp.clear_text('--!!!@@,,!'), '')
		self.assertEqual(pp.clear_text(''), '')


	def test_remove_stopwords(self):
		self.assertEqual(pp.remove_stopwords(['I', 'am', 'a', 'hero']), ['I', 'hero'])
		self.assertEqual(pp.remove_stopwords(['hey', 'you', 'the', 'cat']), ['hey', 'cat'])
		self.assertEqual(pp.remove_stopwords(['']), [''])

	def test_lemmatization(self):
		self.assertEqual(pp.lemmatization(['looks', 'computers', 'cats', 'mine']), 'look computer cat mine')
		self.assertEqual(pp.lemmatization(['look', 'computer', 'cat', 'mine']), 'look computer cat mine')
		self.assertEqual(pp.lemmatization([]), '')

	def test_conduct_preprocessing(self):
		text_1 = "As budget fight looms, Republicans flip their fiscal script"
		text_2 = "A federal appeals court, in, Washington, on!!! Friday rejected a bid by President"
		text_3 = "Mexico’s finance ministry will evaluate whether to make fiscal changes"
		self.assertEqual(pp.conduct_preprocessing(text_1), 'budget fight loom republican flip fiscal script')
		self.assertEqual(pp.conduct_preprocessing(text_2), 'federal appeal court washington friday rejected bid president')
		self.assertEqual(pp.conduct_preprocessing(text_3), 'mexico finance ministry evaluate whether make fiscal change')
		self.assertEqual(pp.conduct_preprocessing(''), '')

if __name__=='__main__':
	unittest.main()
