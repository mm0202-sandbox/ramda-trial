import {
  __,
  add,
  append,
  assoc,
  chain,
  compose,
  curry,
  is,
  lens,
  lensIndex,
  lensPath,
  lensProp,
  map,
  multiply,
  pipe,
  prop,
  range,
  remove,
  set,
  sum,
  view,
  zipWith,
} from 'ramda'
import { curry as lodashCurry } from 'lodash'

describe('sandbox', () => {
  describe('ramdaのpipeとcompose', () => {
    describe('from https://qiita.com/akameco/items/e5bbefefd5940dff84d9', () => {
      test('compose', () => {
        const calcCompose = compose(Math.abs, add(1), multiply(2))
        expect(calcCompose(-4)).toBe(7)
      })

      test('pipe', () => {
        const calcPipe = pipe(Math.abs, add(1), multiply(2))
        expect(calcPipe(-4)).toBe(10)
      })
    })
  })

  describe('超強力な関数型プログラミング用ライブラリ Ramda.js を学ぼう', () => {
    type User = {
      name: string
      email: string
      age: number
      address: {
        zipcode: string
      }
    }

    const user = (): User => ({
      name: 'Bret',
      email: 'bred@april.biz',
      age: 22,
      address: {
        zipcode: '92998-3874',
      },
    })

    describe('from https://tech.recruit-mp.co.jp/front-end/post-16249/', () => {
      describe('オブジェクトを操作してみる', () => {
        test('prop', () => {
          expect(prop('name', user())).toBe('Bret')
        })

        test('assoc', () => {
          expect(assoc<number, User, string>('age', 23, user())).toEqual({
            ...user(),
            age: 23,
          })
        })
      })

      test('ほぼ全ての API がカリー化を備えている', () => {
        const updateAge = assoc<string>('age')
        expect(updateAge(23)(user())).toEqual({
          ...user(),
          age: 23,
        })
        expect(updateAge(24)(user())).toEqual({
          ...user(),
          age: 24,
        })
      })
    })

    describe('from https://tech.recruit-mp.co.jp/front-end/post-16290/', () => {
      describe('オブジェクトのプロパティにアクセスする lens 関数を作ってみる', () => {
        const ageLens = () => lens(prop<string>('age'), assoc<string>('age'))

        test('getter', () => {
          expect(view(ageLens(), user())).toBe(22)
        })

        test('setter', () => {
          const newUser = set(ageLens(), 23, user())
          expect(newUser).toEqual({
            ...user(),
            age: 23,
          })
        })
      })

      describe('ネストしたプロパティに直接アクセスするには', () => {
        test('lensPath', () => {
          const zipcodeLens = lensPath(['address', 'zipcode'])
          expect(view(zipcodeLens, user())).toBe('92998-3874')
        })

        test('lensPath with Array', () => {
          const post = {
            id: 1,
            title: 'ポラーノの広場',
            body: `あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。`,
            tags: [
              { name: '小説', slug: 'novel' },
              { name: '宮沢賢治', slug: 'kenji-miyazawa' },
            ],
          }

          const tagLens = lensPath(['tags', 1, 'name'])

          expect(view(tagLens, post)).toBe('宮沢賢治')
        })

        test('lensIndex', () => {
          const headLens = lensIndex(0)

          expect(view(headLens, ['foo', 'bar', 'baz'])).toBe('foo')
          expect(set(headLens, 'hoge', ['foo', 'bar', 'baz'])).toStrictEqual([
            'hoge',
            'bar',
            'baz',
          ])
        })

        test('lensProp', () => {
          // どちらも同じ
          const ageLens1 = lens(prop<string>('age'), assoc<string>('age'))
          const ageLens2 = lensProp<User>('age')

          expect(view(ageLens1, user())).toBe(22)
          expect(view(ageLens2, user())).toBe(22)
        })
      })
    })
  })

  describe('JavaScriptで関数型プログラミング！Ramda.jsのはじめかた ', () => {
    describe('from https://www.webprofessional.jp/functional-programming-with-ramda/', () => {
      describe('カリー化', () => {
        const isString = is(String)
        expect(isString('foo')).toBe(true)

        const quadratic = curry(
          (a: number, b: number, c: number, x: number) => x * x * a + x * b + c
        )
        expect(quadratic(1, 0, 0, 2)).toBe(4)
        expect(quadratic(1, 0, 0)(2)).toBe(4)

        const xOffset = quadratic(0, 1, -1)
        expect(xOffset(0)).toBe(-1)
        expect(xOffset(1)).toBe(0)
      })
      describe('不変の構造', () => {
        describe('読み取り専用のアクセサ', () => {
          test('書き込み可', () => {
            const position = {
              x: 5,
              y: 9,
            }
            position.x = 10
            expect(position.x).toBe(10)
          })

          test('getter', () => {
            const position = (function (x, y) {
              return {
                getX: () => {
                  return x
                },
                getY: () => {
                  return y
                },
              }
            })(5, 9)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            expect(() => (position.getX() = 10)).toThrow()
            expect(position.getX()).toBe(5)

            position.getX = function () {
              return 10
            }
            expect(position.getX()).toBe(10)
          })

          test('Object.freeze', () => {
            const position = Object.freeze({ x: 5, y: 9 })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            expect(() => (position.x = 10)).toThrow()
            expect(position.x).toBe(5)
          })
        })

        test('list', () => {
          const list = ['write', 'more']
          expect(append('tests', list)).toStrictEqual([
            'write',
            'more',
            'tests',
          ])
          expect(append('tests', list)).toStrictEqual([
            'write',
            'more',
            'tests',
          ])
          expect(append('tests', list)).toStrictEqual([
            'write',
            'more',
            'tests',
          ])
          expect(list).toStrictEqual(['write', 'more'])

          expect(remove(0, 1, list)).toStrictEqual(['more']) // 記事とは異なります。バージョンアップで動作変更？
          expect(list).toStrictEqual(['write', 'more'])
        })
      })
      describe('ユーティリティメソッド', () => {
        test('sum()関数とrange()関数', () => {
          expect(sum(range(1, 5))).toBe(10)

          const from10ToExclusive = range(10)
          expect(from10ToExclusive(15)).toStrictEqual([10, 11, 12, 13, 14])

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const to14FromInclusive = range(__, 15)
          expect(to14FromInclusive(10)).toStrictEqual([10, 11, 12, 13, 14])
        })

        test('map()関数', () => {
          expect(map((x) => 2 * x, [1, 2, 3])).toStrictEqual([2, 4, 6])
        })

        test('prop()関数', () => {
          expect(prop('x', { x: 100 })).toBe(100)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          expect(prop('x', { y: 50 })).toBeUndefined()
        })

        test('zipWith()関数', () => {
          const letters = ['A', 'B', 'C', 'D', 'E']
          const numbers = [1, 2, 3]
          const zipper = zipWith<string, number, string>((x, y) => x + y)
          expect(zipper(letters, numbers)).toStrictEqual(['A1', 'B2', 'C3'])

          const dot = pipe(
            zipWith<number, number, number>((x, y) => x * y),
            sum
          )
          expect(dot([1, 2, 3], [1, 2, 3])).toBe(14)
        })

        test('chain()関数', () => {
          expect(chain((x) => [x, x * 2], [4, 7, 21])).toStrictEqual([
            4, 8, 7, 14, 21, 42,
          ]) // 記事とは異なります。primeFactorizationが見当たらなかったので、適当な関数を割り当て
        })
      })

      describe('lens関数', () => {
        //  別記事のトレースサンプルが詳しいのでパス
      })
    })
  })

  /**
   * # summary
   * - カリー化した関数のIDEドキュメント表示について
   *  - PhpStormの場合だと、ramdaは詳細で、引数も詳しめ。lodashはドキュメント表示はほぼなし
   *  - VSCodeの場合は、どちらも詳細で大差なし
   */
  describe('lodashのcurryと比較', () => {
    const sampleFunction = (a: string, b: string, c: number) => ({
      a,
      b,
      c,
    })

    test('ramda', () => {
      const ramdaCurryingFunc = curry(sampleFunction)
      expect(ramdaCurryingFunc('ramda?')('ramda!')(1)).toStrictEqual({
        a: 'ramda?',
        b: 'ramda!',
        c: 1,
      })

      // エラー回避のため、一部引数をany型にキャスト
      ramdaCurryingFunc(1 as any, 1 as any, 1)
      ramdaCurryingFunc('test', 1 as any, 1)
      ramdaCurryingFunc('test', 'test', 'test' as any)
    })

    test('lodash', () => {
      const lodashCurryingFunc = lodashCurry(sampleFunction)
      expect(lodashCurryingFunc('lodash?')('lodash!')(2)).toStrictEqual({
        a: 'lodash?',
        b: 'lodash!',
        c: 2,
      })

      // エラー回避のため、一部引数をany型にキャスト
      lodashCurryingFunc(1 as any, 1 as any, 1)
      lodashCurryingFunc('test', 1 as any, 1)
      lodashCurryingFunc('test', 'test', 'test' as any)
    })
  })
})

export {}
